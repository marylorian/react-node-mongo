import { Schema, model } from "mongoose";

const promotionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
		price: {
			// mongoose-currency is deprecated and throws error
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export default model("Promotion", promotionSchema);
