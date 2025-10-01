import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bio: {type: String, default: ""},
    name: {type: String, required: true},
    links: {
        type: Map,
        of: String,
        default: {}
    }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema);