import mongoose from 'mongoose'

const MathathonSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: [String],
    winners: [
        {
            submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' },
            participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            prize: String
        }
    ],
    coverImage: { type: String } // URL to image

    }, { timestamps: true })

export default mongoose.models.Mathathon || mongoose.model('Mathathon', MathathonSchema);