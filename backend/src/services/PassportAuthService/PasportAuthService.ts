import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

import config from "../../config/config";
import User, { UserDocument } from "../../models/user";

declare global {
	namespace Express {
		interface User extends UserDocument {}
	}
}

export const local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export const getToken = (user) => {
	return jwt.sign(user, config.secret, { expiresIn: 3600 });
};

export const jwtPassport = passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.secret,
		},
		async (jwtPayload, doneCallback) => {
			try {
				const user = await User.findById(jwtPayload._id);

				if (!user) {
					return doneCallback(null, false);
				}

				return doneCallback(null, user);
			} catch (err) {
				return doneCallback(err, false);
			}
		},
	),
);

export const verifyUser = passport.authenticate("jwt", { session: false });
