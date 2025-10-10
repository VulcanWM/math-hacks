import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true }, // stored as lowercase
        username: { type: String, required: true, unique: true, maxlength: 30 },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        bio: { type: String, default: "", maxlength: 200 },
        name: { type: String, required: true, maxlength: 50 },
        links: {
            type: Map,
            of: String,
            default: {},
        },
        badges: [String],
        delta: { type: Number, default: 0},
        xp: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        collation: { locale: "en", strength: 2 } // queries default to case-insensitive
    }
);

// Case-insensitive unique index for username
UserSchema.index(
    { username: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
);

// Case-insensitive unique index for email
UserSchema.index(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);