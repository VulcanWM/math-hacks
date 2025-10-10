import mongoose from 'mongoose'

const MathathonSchema = new mongoose.Schema({
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
    topic: {type: String, required: true},
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

export default mongoose.models.Mathathon || mongoose.model('Mathathon', MathathonSchema);