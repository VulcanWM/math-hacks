import dbConnect from './mongodb';
import User from '../models/User';

export async function create_user(
    email: string,
    username: string,
    bio: string,
    name: string,
    links: { [key: string]: string }
) {
    await dbConnect();

    try {
        const user = await User.create({
            email,
            username,
            bio,
            name,
            links: links || {},
        });
        return user;
    } catch (err: any) {
        if (err.name === "ValidationError") {
            // handles maxlength, required fields, etc.
            throw new Error(Object.values(err.errors).map(e => e.message).join(", "));
        }
        if (err.code === 11000) {
            // duplicate key error
            if (err.keyPattern?.email) throw new Error("Email already in use");
            if (err.keyPattern?.username) throw new Error("Username already in use");
        }
        throw err; // rethrow anything unexpected
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
        { collation: { locale: "en", strength: 2 } }
    );
    return user == null ? false : user;
}