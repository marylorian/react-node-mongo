import { Document, Schema, model, Model } from "mongoose";

export interface Comment {
	rating: number;
	author: string;
	comment?: string;
}

export interface CommentDocument extends Document, Comment {}

export const commentSchema = new Schema<CommentDocument>(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default model<CommentDocument, Model<CommentDocument>>(
	"Comment",
	commentSchema,
);
