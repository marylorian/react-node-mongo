import express from "express";
import passport from "passport";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import Users, { UserDocument } from "../models/user";
import { RouteError } from "../types/RouteError";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
	res.status(HttpStatusCodes.BAD_REQUEST);
	res.send("GET user/ not implemented yet");
});

userRouter.post("/signup", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new RouteError(HttpStatusCodes.BAD_REQUEST, "Incorrect Data");
		}

		await Users.register(
			{ username } as UserDocument,
			password,
			(err, account) => {
				if (err) {
					return next(err);
				}
				passport.authenticate("local", { session: false })(
					req,
					res,
					() => {
						res.status(HttpStatusCodes.OK);
						res.setHeader("Content-Type", "application/json");
						return res.json({
							sucess: true,
							status: "registration successful",
						});
					},
				);
			},
		);
	} catch (err) {
		next(err);
	}
});

userRouter.get(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		const token = PassportAuthService.getToken({ _id: req.user?._id });

		res.setHeader("Content-Type", "application/json");
		res.status(HttpStatusCodes.OK);
		return res.json({
			token,
			status: `login ${req.body.username} successful`,
		});
	},
);

userRouter.get("/logout", async (req, res, next) => {
	try {
		if (!req.session) {
			throw new RouteError(
				HttpStatusCodes.NOT_FOUND,
				"You are not logged in",
			);
		}

		req.session.destroy((err) => {
			if (err) {
				throw err;
			}
			res.clearCookie("session-id");
			res.redirect("/");
		});
	} catch (err) {
		next(err);
	}
});

export { userRouter };
