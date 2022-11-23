import express from "express";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import Leaders from "../models/leaders";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";

const leaderRouter = express.Router();

leaderRouter
	.route("/")
	.get(async (req, res, next) => {
		try {
			const leaders = await Leaders.find({});

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(leaders);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(PassportAuthService.verifyUser, (req, res, next) => {
		res.statusCode = HttpStatusCodes.BAD_REQUEST;
		res.send(`POST all leaders not implemented yet`);
	})
	.put(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { name, image, designation, abbr, description, featured } =
				req.body;

			const leaders = await Leaders.create({
				name,
				image,
				designation,
				abbr,
				description,
				featured,
			});

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(leaders);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.delete(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const response = await Leaders.remove({});

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(response);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

leaderRouter
	.route("/:leaderId")
	.get(async (req, res, next) => {
		try {
			const { leaderId } = req.params;

			const leader = await Leaders.findById(leaderId);

			if (!leader) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Leader ${leaderId} was not found`);
			}

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(leader);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(PassportAuthService.verifyUser, (req, res, next) => {
		const { leaderId } = req.params;
		res.send(`POST leaders/${leaderId} is not implemented yet`);
	})
	.put(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { leaderId } = req.params;

			const leader = await Leaders.findByIdAndUpdate(
				leaderId,
				{ $set: req.body },
				{ new: true },
			);

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(leader);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.delete(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { leaderId } = req.params;

			const response = await Leaders.findByIdAndRemove(leaderId);

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(response);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

export { leaderRouter };
