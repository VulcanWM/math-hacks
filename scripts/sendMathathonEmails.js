import mongoose from "mongoose";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MathathonModule = await import(`file://${path.join(__dirname, "../models/Mathathon.js")}`);
const Mathathon = MathathonModule.default;

const UserModule = await import(`file://${path.join(__dirname, "../models/User.js")}`);
const User = UserModule.default;

const JoinModule = await import(`file://${path.join(__dirname, "../models/Join.js")}`);
const Join = JoinModule.default;

const EmailModule = await import(`file://${path.join(__dirname, "../utils/sendEmail.js")}`);
const { sendEmail } = EmailModule;


function normaliseUTC(date) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

await mongoose.connect(process.env.MONGODB_URI);

const mathathons = await Mathathon.find({
    declareWinnerDate: { $gte: today }, // upcoming or current
}).lean();

for (const m of mathathons) {
    const start = normaliseUTC(m.startDate);
    const declare = normaliseUTC(m.declareWinnerDate);

    const diffDays = Math.floor((start - today) / (1000 * 60 * 60 * 24));
    const sinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const untilDeclare = Math.floor((declare - today) / (1000 * 60 * 60 * 24));

    console.log(
        `Checking ${m._id} — diffDays=${diffDays}, sinceStart=${sinceStart}, untilDeclare=${untilDeclare}`
    );

    // --- 5 DAYS BEFORE START: invite everyone ---
    if (diffDays === 5) {
        const users = await User.find().lean();
        for (const u of users) {
            await sendEmail(
                u.email,
                `${m.title} starts soon!`,
                `Hey ${u.name},\n\nMathHacks ${m.title} starts this Saturday!\n\nJoin now: https://mathhacks.org.uk/mathathon/${m._id}`
            );
        }
    }

    // --- ON START DATE: notify joined users ---
    if (diffDays === 0) {
        const joins = await Join.find({ mathathon: m._id }).populate("participant").lean();
        for (const j of joins) {
            await sendEmail(
                j.participant.email,
                `MathHacks ${m.title} has started!`,
                `Hey ${j.participant.name},\n\nYour mathathon has officially started! Make sure to submit before it ends.\nCheck out the mathathon: https://mathhacks.org.uk/mathathon/${m._id}`
            );
        }
    }

    // --- SECOND DAY: "1 day left" reminder ---
    if (sinceStart === 1) {
        const joins = await Join.find({ mathathon: m._id }).populate("participant").lean();
        for (const j of joins) {
            await sendEmail(
                j.participant.email,
                `${m.title} — 1 day left!`,
                `Hey ${j.participant.name},\n\nOnly 1 day left before submissions close. Give it your best shot!\nSubmit it here: https://mathhacks.org.uk/mathathon/${m._id}`
            );
        }
    }

    // --- DECLARE WINNER DAY: results out ---
    if (untilDeclare === 0) {
        const joins = await Join.find({ mathathon: m._id }).populate("participant").lean();

        // Find next mathathon (e.g., "mathathon-002" after "mathathon-001")
        const next = await Mathathon.findOne({}).sort({ _id: 1 }).lean();
        const nextText = next
            ? `\n\nNext up: ${next.title}\nJoin at https://mathhacks.org.uk/mathathon/${next._id}`
            : "";

        for (const j of joins) {
            await sendEmail(
                j.participant.email,
                `MathHacks ${m.title} results are out!`,
                `Hey ${j.participant.name},\n\nThe results for ${m.title} are live!\nSee winners: https://mathhacks.org.uk/mathathon/${m._id}${nextText}`
            );
        }
    }
}

await mongoose.disconnect();
console.log("Daily MathHacks email run complete.");
