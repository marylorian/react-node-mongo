import { Schema, model } from "mongoose"

const leaderSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
		designation: {
			type: String,
			required: true,
		},
		abbr: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

export default model("Leader", leaderSchema)
