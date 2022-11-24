import express from "express";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import Promotions from "../models/promotions";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";

const promoRouter = express.Router();

promoRouter
	.route("/")
	.get(async (req, res, next) => {
		try {
			const promos = await Promotions.find(req.query);

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(promos);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			res.statusCode = HttpStatusCodes.BAD_REQUEST;
			res.send(`POST all promotions not implemented yet`);
		},
	)
	.put(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
			try {
				const { name, image, label, price, description, featured } =
					req.body;

				const promos = await Promotions.create({
					name,
					image,
					label,
					price,
					description,
					featured,
				});

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(promos);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	)
	.delete(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
			try {
				const response = await Promotions.remove({});

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(response);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	);

promoRouter
	.route("/:promoId")
	.get(async (req, res, next) => {
		try {
			const { promoId } = req.params;

			const promo = await Promotions.findById(promoId);

			if (!promo) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Promotion ${promoId} was not found`);
			}

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(promo);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			const { promoId } = req.params;
			res.send(`POST promotions/${promoId} is not implemented yet`);
		},
	)
	.put(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
			try {
				const { promoId } = req.params;

				const promo = await Promotions.findByIdAndUpdate(
					promoId,
					{ $set: req.body },
					{ new: true },
				);

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(promo);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	)
	.delete(
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
			try {
				const { promoId } = req.params;

				const response = await Promotions.findByIdAndRemove(promoId);

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(response);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	);

export { promoRouter };
