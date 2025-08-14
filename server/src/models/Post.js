import mongoose from 'mongoose'
const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 160,
		},
		content: { type: String, required: true },
		author: { type: String, default: 'Anonymous', trim: true },
		tags: { type: [String], default: [] },
		published: { type: Boolean, default: true },
	},
	{ timestamps: true }
)
export default mongoose.model('Post', postSchema)
