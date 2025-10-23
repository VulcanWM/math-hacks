import dbConnect from './mongodb';
import User from '../models/User';
import Mathathon from '../models/Mathathon';
import Join from '../models/Join';
import Submission from '../models/Submission';
import mongoose from 'mongoose';

interface MongoDuplicateError extends Error {
    code?: number;
    keyPattern?: Record<string, boolean>;
}

function makeSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove non-word characters
        .replace(/\s+/g, "-")     // replace spaces with hyphens
        .replace(/-+/g, "-")      // collapse multiple hyphens
}

export async function create_user(
    email: string,
    username: string,
    bio: string,
    name: string,
    links: { [key: string]: string }
) {
    await dbConnect();

    try {
        await User.create({
            email,
            username,
            bio,
            name,
            links: links || {},
        });
        return true;
    } catch (err: unknown) {
        // Handle validation errors (required, maxlength, etc.)
        if (err instanceof mongoose.Error.ValidationError) {
            return Object.values(err.errors)
                .map((e) => e.message)
                .join(", ");
        }

        // Handle duplicate key errors (email/username already in use)
        const mongoErr = err as MongoDuplicateError;
        if (mongoErr.code === 11000 && mongoErr.keyPattern) {
            if (mongoErr.keyPattern.email) return "Email already in use";
            if (mongoErr.keyPattern.username) return "Username already in use";
        }

        // Fallback for unexpected errors
        return "An unexpected error occurred";
    }
}


export async function get_user_from_id(id: string){
    await dbConnect();
    const user = await User.findById(id);
    return user == null ? false : user;
}

export async function get_user_from_email(email: string){
    await dbConnect();
    const user = await User.findOne({email: email})
    return user == null ? false : user;
}

export async function get_user_from_username(username: string){
    await dbConnect();
    const user = await User.findOne(
        { username: username },
        null,
        { collation: { locale: "en", strength: 2 } }
    );
    return user == null ? false : user;
}


export async function create_mathathon(
    title: string,
    mathathonType: string,
    theme: string,
    deltaValue: number,
    startDate: Date,
    endDate: Date,
    declareWinnerDate: Date,
    prizes: { prizeName: string; prize: string }[],
    creatorId: string
) {
    await dbConnect();

    try {
        // Verify creator
        const creator = await get_user_from_id(creatorId);
        if (!creator) {
            return { success: false, message: "You are not logged in." };
        }

        if (creator.role !== "admin") {
            return { success: false, message: "You are not an admin." };
        }

        // Generate slug
        const slug = makeSlug(title);

        // Try to create new mathathon
        await Mathathon.create({
            _id: slug,
            creator: creator._id,
            startDate,
            endDate,
            declareWinnerDate,
            deltaValue,
            title,
            winners: [],
            mathathonType,
            coverImage: "",
            theme,
            sponsors: [],
            prizes,
        });

        return { success: true, message: slug };
    } catch (err: unknown) {
        // Handle validation errors (required fields, type mismatches, etc.)
        if (err instanceof mongoose.Error.ValidationError) {
            const message = Object.values(err.errors)
                .map((e) => e.message)
                .join(", ");
            return { success: false, message };
        }

        // Handle duplicate key error (same slug already exists)
        const mongoErr = err as MongoDuplicateError;
        if (mongoErr.code === 11000 && mongoErr.keyPattern?._id) {
            return {
                success: false,
                message: "A mathathon with this title already exists.",
            };
        }

        // Handle unexpected errors
        console.error("Error creating mathathon:", err);
        return { success: false, message: "Unexpected server error." };
    }
}

export async function get_mathathon_from_id(id: string){
    await dbConnect();
    const mathathon = await Mathathon.findById(id);
    return mathathon == null ? false : mathathon;
}

export async function get_number_of_joins(mathathonId: string){
    await dbConnect();

    const joins = await Join.countDocuments({mathathon: mathathonId});
    return joins;
}

export async function get_number_of_submissions(mathathonId: string){
    await dbConnect();

    const submissions = await Submission.countDocuments({mathathon: mathathonId});
    return submissions;
}

export async function has_user_joined(userId: string, mathathonId: string){
    await dbConnect();

    const join = await Join.findOne({participant: userId, mathathon: mathathonId});
    return join != null;
}

export async function get_user_mathathon_submission(userId: string, mathathonId: string){
    await dbConnect();

    const submission = await Submission.findOne({participant: userId, mathathon: mathathonId});
    return submission == null ? false : submission;
}

export async function join_mathathon(userId: string, mathathonId: string){
    await dbConnect();

    const joined = await has_user_joined(userId, mathathonId);

    if (joined) {
        return { success: true, message: "You have already joined this mathathon." };
    } else {await Join.create({
            participant: userId,
            mathathon: mathathonId,
        });
        return { success: true, message: "You have joined" };
    }
}

export async function get_landing_mathathons() {
    await dbConnect();

    const today = new Date();

    // Get current + future mathathons, limit 3
    const mathathons = await Mathathon.find({
        endDate: { $gte: today },
        _id: { $ne: "test-mathathon" }
    })
        .sort({ startDate: 1 })
        .limit(3);

    const enriched = await Promise.all(
        mathathons.map(async (mathathon) => {
            const joins = await Join.countDocuments({ mathathon: mathathon._id });

            let status: "current" | "future" = "future";
            let daysLeft: number = 0;

            if (today >= mathathon.startDate && today <= mathathon.endDate) {
                status = "current";
                daysLeft = Math.ceil(
                    (mathathon.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );
            } else if (today < mathathon.startDate) {
                status = "future";
                daysLeft = Math.ceil(
                    (mathathon.startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );
            }

            return {
                ...mathathon.toObject(),
                joins,
                status,
                daysLeft,
            };
        })
    );

    return enriched;
}

export async function get_user_submissions(userId: string){
    await dbConnect();

    const submissions = await Submission.find({participant: userId}).populate("mathathon");
    return submissions;
}

export async function get_current_mathathons() {
    await dbConnect();

    const today = new Date();

    const mathathons = await Mathathon.find({
        startDate: { $lte: today },
        endDate: { $gte: today },
        _id: { $ne: "test-mathathon" },
    })
        .sort({ startDate: 1 })
        .limit(3);

    const enriched = await Promise.all(
        mathathons.map(async (mathathon) => {
            const joins = await Join.countDocuments({ mathathon: mathathon._id });
            const daysLeft = Math.ceil(
                (mathathon.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );

            return {
                ...mathathon.toObject(),
                joins,
                daysLeft,
            };
        })
    );

    return enriched;
}

export async function get_future_mathathons() {
    await dbConnect();

    const today = new Date();

    const mathathons = await Mathathon.find({
        startDate: { $gt: today },
        _id: { $ne: "test-mathathon" },
    })
        .sort({ startDate: 1 })
        .limit(3);

    // No joins or daysLeft for future ones
    return mathathons.map((m) => m.toObject());
}

export async function get_past_mathathons() {
    await dbConnect();

    const today = new Date();

    const mathathons = await Mathathon.find({
        endDate: { $lt: today },
        _id: { $ne: "test-mathathon" },
    })
        .sort({ endDate: -1 }) // most recent first
        .limit(6);

    const enriched = await Promise.all(
        mathathons.map(async (mathathon) => {
            const joins = await Join.countDocuments({ mathathon: mathathon._id });
            return {
                ...mathathon.toObject(),
                joins,
            };
        })
    );

    return enriched;
}

export async function submit_submission(
    userId: string,
    mathathonId: string,
    title: string,
    description: string,
    thumbnail: string,
    repoLink: string,
    runnableLink: string
) {
    await dbConnect();

    const user = await get_user_from_id(userId);
    if (!user) return { success: false, message: "You are not logged in!" };

    const mathathon = await get_mathathon_from_id(mathathonId);
    if (!mathathon) return { success: false, message: "This mathathon doesn't exist!" };

    const submission = await get_user_mathathon_submission(userId, mathathonId);
    if (submission) return { success: false, message: "You have already submitted!" };

    const join = await has_user_joined(userId, mathathonId);
    if (!join) await join_mathathon(userId, mathathonId);

    try {
        const submission = await Submission.create({
            mathathon: mathathonId,
            participant: user._id,
            title,
            shortDescription: description,
            thumbnail,
            repoLink,
            runnableLink,
        });

        await give_delta(user._id, mathathon.delta)
        await give_xp(user._id, mathathon.delta)

        // const numberOfSubmissions = await Submission.countDocuments({ participant: user._id });
        //
        // const submissionBadges: { [key: string]: number } = {
        //     "4^0 Submissions": 1,
        //     "4^1 Submissions": 4,
        //     "4^2 Submissions": 16,
        //     "4^3 Submissions": 64,
        //     "4^4 Submissions": 256,
        // };
        //
        // for (const [badgeName, value] of Object.entries(submissionBadges)) {
        //     if (numberOfSubmissions === value) {
        //         if (!user.badges.includes(badgeName)) {
        //             user.badges.push(badgeName);
        //         }
        //     }
        // }

        // can just use this

        // const badges = [];
        // const powers = [1, 4, 16, 64, 256];
        // for (let i = 0; i < powers.length; i++) {
        //     if (submissionCount >= powers[i]) {
        //         badges.push(`4^${i} Submissions`);
        //     }
        // }

        await user.save()


        return { success: true, message: submission };
    } catch (err: unknown) {
        if (err instanceof mongoose.Error.ValidationError) {
            const message = Object.values(err.errors)
                .map((e) => e.message)
                .join(", ");
            return { success: false, message };
        }

        // just in case
        const mongoErr = err as MongoDuplicateError;
        if (mongoErr.code === 11000 && mongoErr.keyPattern) {
            const keys = Object.keys(mongoErr.keyPattern);
            return { success: false, message: `Duplicate entry for: ${keys.join(", ")}` };
        }

        return { success: false, message: "An unexpected error occurred while submitting." };
    }
}

export async function give_delta(userId: string, delta: number) {
    await dbConnect();

    const user = await get_user_from_id(userId);
    if (!user) return false;

    user.delta += delta;
    await user.save();

    return true;
}

export async function give_xp(userId: string, xp: number) {
    await dbConnect();

    const user = await get_user_from_id(userId);
    if (!user) return false;

    user.xp += xp;
    await user.save();

    return true;
}

export async function get_mathathon_submissions(mathathonId: string) {
    await dbConnect();

    const submissions = await Submission.find({ mathathon: mathathonId })
        .populate({
            path: 'participant',
            select: 'username name' // pick the fields you want
        });

    return submissions;
}

export async function get_submission_from_id(submissionId: string) {
    await dbConnect();

    const submission = await Submission.findOne({_id: submissionId}).populate("mathathon").populate("participant")
    return submission == null ? false : submission;
}

export async function get_participant_stats(participantId: string) {
    await dbConnect();

    const [wins] = await Mathathon.aggregate([
        { $unwind: "$winners" },
        { $match: { "winners.participant": participantId} },
        {
            $group: {
                _id: "$winners.participant",
                firstPrizeCount: {
                    $sum: { $cond: [{ $eq: ["$winners.prize", "1st prize"] }, 1, 0] },
                },
                top3Count: {
                    $sum: {
                        $cond: [
                            { $in: ["$winners.prize", ["1st prize", "2nd prize", "3rd prize"]] },
                            1,
                            0,
                        ],
                    },
                },
            },
        },
    ]);

    const submissionCount = await Submission.countDocuments({
        participant: participantId,
    });

    return {
        firstPrizeCount: wins?.firstPrizeCount || 0,
        top3Count: wins?.top3Count || 0,
        submissionCount,
    };
}

export function calculate_badges(stats: {submissionCount: number
    top3Count: number
    firstPrizeCount: number}) {
    const getLevel = (count: number, base: number) => {
        let level = 0
        let threshold = 1
        while (count >= threshold) {
            level++
            threshold = Math.pow(base, level)
        }
        const nextThreshold = Math.pow(base, level)
        const remaining = nextThreshold - count
        const unlocked = count >= 1
        return { exponent: Math.max(level - 1, 0), nextThreshold, remaining, unlocked }
    }

    return {
        submissions: getLevel(stats.submissionCount, 4),
        top3: getLevel(stats.top3Count, 3),
        winner: getLevel(stats.firstPrizeCount, 2),
    }
}

export async function declare_winner(
    mathathonId: string,
    submissionId: string,
    prize: string,
    userId: string) {
    await dbConnect()

    const admin_user = await get_user_from_id(userId)
    if (!admin_user) {
        return { success: false, message: "You are not logged in." }
    }

    if (admin_user.role != "admin"){
        return { success: false, message: "You are not an admin." }
    }

    const mathathon = await get_mathathon_from_id(mathathonId)
    if (!mathathon) {
        return { success: false, message: "Mathathon not found" }
    }

    const submission = await get_submission_from_id(submissionId)
    if (!submission) {
        return { success: false, message: "Submission not found" }
    }

    const participantId = submission.participant._id

    // Prevent duplicate
    const alreadyWinner = mathathon.winners.some(
        (w: { participant: string, prize: string }) =>
            String(w.participant) === String(participantId) &&
            w.prize === prize
    )
    if (alreadyWinner) {
        return { success: false, message: "Participant already recorded as winner for this prize" }
    }

    const multipliers: Record<string, number> = {
        "1st Prize": 5,
        "2nd Prize": 3,
        "3rd Prize": 2,
    }

    const baseDelta = mathathon.deltaValue || 1
    const multiplier = multipliers[prize] || 1
    const extraDelta = baseDelta * (multiplier - 1)

    mathathon.winners.push({
        participant: participantId,
        submission: submission._id,
        prize,
    })

    await mathathon.save()

    const user = await get_user_from_id(participantId)

    user.delta += extraDelta
    user.xp += extraDelta

    await user.save()

    return {
        success: true,
        message: "Winner added successfully",
    }
}

export async function get_prize_for_submission(mathathonId: string, submissionId: string) {
    await dbConnect();
    const mathathon = await Mathathon.findById(mathathonId);
    if (!mathathon) return null;

    const winner = mathathon.winners.find(
        (w: { submission: string; participant: string; prize: string }) => String(w.submission) === String(submissionId)
    );

    return winner ? winner.prize : null;
}

export async function get_highest_rank_for_user(userId: string): Promise<string> {
    await dbConnect();

    // Get all mathathons that have winners
    const mathathons = await Mathathon.find({ 'winners.participant': userId }).lean();

    if (!mathathons || mathathons.length === 0) return "-";

    let bestRank = Infinity;

    mathathons.forEach((mathathon) => {
        mathathon.winners.forEach((winner: { participant: string; prize: string }) => {
            if (String(winner.participant) === String(userId)) {
                let rank = -1;
                if (winner.prize?.toLowerCase().includes('1st')) rank = 1;
                else if (winner.prize?.toLowerCase().includes('2nd')) rank = 2;
                else if (winner.prize?.toLowerCase().includes('3rd')) rank = 3;

                if (rank !== -1 && rank < bestRank) bestRank = rank;
            }
        });
    });

    return bestRank === Infinity ? "-" : ("#" + String(bestRank));
}