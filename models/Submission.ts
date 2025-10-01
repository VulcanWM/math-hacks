import mongoose from 'mongoose'

const SubmissionSchema = new mongoose.Schema({
    mathathon: { type: mongoose.Schema.Types.ObjectId, ref: 'Mathathon', required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    // longDescription: {type: String, required: true}, can use github readme description
    thumbnail: { type: String, required: true },
    repoLink: { type: String, required: true },
    runnableLink: { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);