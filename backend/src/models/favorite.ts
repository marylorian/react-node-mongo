import { Document, Schema, Model, model, Types } from "mongoose";

interface FavoriteDocument extends Document {
	user: Types.ObjectId;
	dishes: Types.ObjectId[];
}

const favoriteSchema = new Schema<FavoriteDocument>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		dishes: [
			{
				type: Schema.Types.ObjectId,
				ref: "Dish",
			},
		],
	},
	{ timestamps: true },
);

export default model<FavoriteDocument, Model<FavoriteDocument>>(
	"Favorites",
	favoriteSchema,
);
