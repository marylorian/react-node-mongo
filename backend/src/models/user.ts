import { Document, Schema, model, PassportLocalModel } from "mongoose";
import PassportLocal from "passport-local-mongoose";

export interface UserDocument extends Document {
	admin?: boolean;
	username: string;
	firstname?: string;
	lastname?: string;
}

const userSchema = new Schema<UserDocument>({
	admin: {
		type: Boolean,
		default: false,
	},
	firstname: {
		type: String,
		default: "",
	},
	lastname: {
		type: String,
		default: "",
	},
});

userSchema.plugin(PassportLocal);

interface UserModel extends PassportLocalModel<UserDocument> {}

export default model<UserDocument, UserModel>("User", userSchema);
