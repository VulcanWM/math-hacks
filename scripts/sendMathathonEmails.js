import mongoose from "mongoose";
import nodemailer from "nodemailer";

const Mathathon = new mongoose.Schema({
    _id: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    declareWinnerDate: {type: Date, required: true},
    deltaValue: {type: Number, required: true},
    title: {type: String, required: true},
    winners: [
        {
            submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' },
            participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            prize: String
        }
    ],
    mathathonType: {type: String, required: true},
    coverImage: { type: String }, // URL to image
    theme: {type: String, required: true},
    sponsors: [
        {
            name: String,
            url: String,
        }
    ],
    prizes: [
        {
            prizeName: String, // 1st place
            prize: String // badge + money
        }
    ]
}, { timestamps: true })

const User = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true },
        username: { type: String, required: true, maxlength: 30 },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        bio: { type: String, default: "", maxlength: 200 },
        name: { type: String, required: true, maxlength: 50 },
        links: {
            type: Map,
            of: String,
            default: {},
        },
        badges: { type: [String], default: [] },
        delta: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        collation: { locale: "en", strength: 2 },
    }
);

User.index(
    { username: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
);

User.index(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
);

const Join = new mongoose.Schema({
    mathathon: { type: String, ref: 'Mathathon', required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

export async function sendEmail(to, subject, text) {
    if (!to) return;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"MathHacks" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });

    console.log(`📨 Sent to ${to}: ${subject}`);
}



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
