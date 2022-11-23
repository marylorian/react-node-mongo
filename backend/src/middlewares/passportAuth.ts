import { RouteError } from "../types/RouteError";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export const passportAuth = async (req, res, next) => {
	try {
		if (!req.user) {
			res.status(HttpStatusCodes.UNAUTHORIZED);
			throw new RouteError(
				HttpStatusCodes.UNAUTHORIZED,
				"You are not authorized",
			);
		}

		next();
	} catch (err) {
		next(err);
	}
};
