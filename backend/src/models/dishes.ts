import mongoose from "mongoose";

import { commentSchema } from "./comments";

export const dishSchema = new mongoose.Schema(
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

export default mongoose.model("Dish", dishSchema);
