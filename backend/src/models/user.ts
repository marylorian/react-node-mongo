import { Document, Schema, model, PassportLocalModel } from "mongoose";
import PassportLocal from "passport-local-mongoose";

export interface UserDocument extends Document {
	admin?: boolean;
	username: string;
}

const userSchema = new Schema<UserDocument>({
	admin: {
		type: Boolean,
		default: false,
	},
});

userSchema.plugin(PassportLocal);

interface UserModel extends PassportLocalModel<UserDocument> {}

export default model<UserDocument, UserModel>("User", userSchema);
