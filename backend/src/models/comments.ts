import { Document, Schema, model, Model, Types } from "mongoose";

export interface Comment {
	rating: number;
	author: Types.ObjectId;
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
			type: Schema.Types.ObjectId,
			ref: "User",
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
