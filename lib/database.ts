import dbConnect from './mongodb';
import User from '../models/User';
import Mathathon from '../models/Mathathon';

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
    } catch (err: any) {
        if (err.name === "ValidationError") {
            // handles maxlength, required fields, etc.
            return Object.values(err.errors).map(e => e.message).join(", ")
        }
        if (err.code === 11000) {
            // duplicate key error
            if (err.keyPattern?.email) return "Email already in use"
            if (err.keyPattern?.username) return"Username already in use"
        }
        return err; // rethrow anything unexpected
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
    } catch (err: any) {
        // Handle validation errors (required fields, type mismatches, etc.)
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors)
                .map((e: any) => e.message)
                .join(", ");
            return { success: false, message };
        }

        // Handle duplicate key error (same slug already exists)
        if (err.code === 11000) {
            if (err.keyPattern?._id) {
                return { success: false, message: "A mathathon with this title already exists." };
            }
        }

        // Handle other unexpected errors
        console.error("Error creating mathathon:", err);
        return { success: false, message: "Unexpected server error." };
    }
}
