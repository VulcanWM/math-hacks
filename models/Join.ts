import mongoose from 'mongoose'

const JoinSchema = new mongoose.Schema({
    mathathon: { type: String, ref: 'Mathathon', required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

export default mongoose.models.Join || mongoose.model('Join', JoinSchema);