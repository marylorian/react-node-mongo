import express from "express";
import multer from "multer";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import { RouteError } from "../types/RouteError";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const imageFileFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error("Wrong file format"), false);
	}
	cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter
	.route("/")
	.get(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			next(
				new RouteError(
					HttpStatusCodes.NOT_IMPLEMENTED,
					"GET not supported",
				),
			);
		},
	)
	.put(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			next(
				new RouteError(
					HttpStatusCodes.NOT_IMPLEMENTED,
					"GET not supported",
				),
			);
		},
	)
	.post(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		upload.single("imageFile"),
		(req, res, next) => {
			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(req.file);
		},
	)
	.delete(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			next(
				new RouteError(
					HttpStatusCodes.NOT_IMPLEMENTED,
					"GET not supported",
				),
			);
		},
	);

export { uploadRouter };
