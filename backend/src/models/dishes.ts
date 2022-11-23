import { Document, Schema, model, Model, Types } from "mongoose";

import { commentSchema, Comment } from "./comments";

interface DishDocument extends Document {
	name: string;
	description: string;
	category?: string;
	label?: string;
	price?: number;
	image?: string;
	comments?: Types.DocumentArray<Comment>;
}

export const dishSchema = new Schema<DishDocument>(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			default: "Starter",
		},
		label: {
			type: String,
			default: "",
		},
		price: {
			type: Number,
			default: 0,
			min: 0,
		},
		image: {
			type: String,
			default: "",
		},
		comments: [commentSchema],
	},
	{
		timestamps: true,
	},
);

export default model<DishDocument, Model<DishDocument>>("Dish", dishSchema);
