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

            let status: "current" | "future";
            let daysLeft: number;

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

    const submissions = await Submission.find({participant: userId});
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
