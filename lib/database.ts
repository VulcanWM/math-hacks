import dbConnect from './mongodb';
import User from '../models/User';
import Mathathon from '../models/Mathathon'
import Submission from '../models/Submission'

export async function create_user(
    email: string,
    username: string,
    role: "user" | "admin",
    bio: string,
    name: string,
    links: { [key: string]: string }
) {
    await dbConnect();

    try {
        const user = await User.create({
            email,
            username,
            role,
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

export async function get_mathathon_from_id(id: string){
    await dbConnect();
    const mathathon = await Mathathon.findById(id)
    return mathathon == null ? false : mathathon;
}

export async function get_all_mathathons(){
    await dbConnect();
    const mathathons = await Mathathon.find()
    return mathathons;
}

export async function create_mathathon(
    creator_id: string,
    startDate: Date,
    endDate: Date,
    title: string,
    description: string,
    tags: string[],
    coverImage: string
) {
    await dbConnect();

    const creator = await get_user_from_id(creator_id);
    if (!creator || creator.role !== "admin") {
        return "You must be an admin to create a mathathon";
    }

    if (startDate > endDate) return "Start date must be before end date";
    if (startDate < new Date()) return "Start date must be in the future";

    try {
        const mathathon = await Mathathon.create({
            creator: creator._id,
            startDate,
            endDate,
            title,
            description,
            tags,
            winners: [],
            coverImage
        });
        return mathathon;
    } catch (err: unknown) {
        if (err instanceof mongoose.Error.ValidationError) {
            return Object.values(err.errors).map(e => e.message).join(", ");
        }
        throw err;
    }
}

export async function get_submission_from_id(id: string){
    await dbConnect();
    const submission = await Submission.findById(id)
    return submission == null ? false : submission;
}

export async function get_all_submissions_of_mathathon(mathathon_id: string){
    await dbConnect();
    const submissions = await Submission.find({mathathon: mathathon_id})
    return submissions;
}

export async function get_all_winning_submissions_of_user(user_id: string) {
    await dbConnect();

    const mathathons = await Mathathon.find({ "winners.participant": user_id })
        .populate("winners.submission")
        .exec();

    const submissions = mathathons.flatMap(mathathon =>
        mathathon.winners
            .filter(w => w.participant.toString() === user_id)
            .map(w => ({
                mathathonId: mathathon._id,
                mathathonTitle: mathathon.title,
                submission: w.submission,
                prize: w.prize
            }))
    );

    return submissions;
}

export async function submit_mathathon_submission(mathathon_id: string, participant_id: string){
    // only once per user per mathathon
    const mathathon = await get_mathathon_from_id(mathathon_id);
    if (mathathon == false) return "Mathathon not found";
    const participant = await get_user_from_id(participant_id);
    if (participant == false) return "You have not signed in";

}