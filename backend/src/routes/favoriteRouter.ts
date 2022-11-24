import express from "express";
import { Types } from "mongoose";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import { DishDocument } from "../models/dishes";
import Favorites from "../models/favorite";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";
import { RouteError } from "../types/RouteError";

const favoritesRouter = express.Router();

favoritesRouter
	.route("/")
	.all(PassportAuthService.verifyUser)
	.get(async (req, res, next) => {
		try {
			if (!req.user) {
				throw new RouteError(
					HttpStatusCodes.UNAUTHORIZED,
					"You are not authorized",
				);
			}

			const favorites = await Favorites.findOne({
				user: req.user._id,
			}).populate(["user", "dishes"]);

			if (!favorites) {
				throw new RouteError(
					HttpStatusCodes.NOT_FOUND,
					"Favorites for user are not found",
				);
			}

			res.setHeader("Content-Type", "application/json");
			res.status(HttpStatusCodes.OK);
			res.json(favorites);
		} catch (err) {
			next(err);
		}
	})
	.post(async (req, res, next) => {
		try {
			if (!req.user) {
				throw new RouteError(
					HttpStatusCodes.UNAUTHORIZED,
					"You are not authorized",
				);
			}

			if (!req.body) {
				throw new RouteError(
					HttpStatusCodes.BAD_REQUEST,
					"Incorrect request body",
				);
			}

			const favorites = await Favorites.findOne({ user: req.user._id });

			if (!favorites) {
				await Favorites.create({
					user: req.user._id,
					dishes: req.body,
				});
			} else {
				favorites.dishes.forEach((dish) => {
					if (
						favorites.dishes.some((favDish) =>
							favDish.equals(dish._id),
						)
					) {
						return;
					}
					favorites.dishes.push(new Types.ObjectId(dish._id));
				});
				favorites.save();
			}

			const updatedFavorites = await Favorites.findOne({
				user: req.user._id,
			});

			res.setHeader("Content-Type", "application/json");
			res.status(HttpStatusCodes.OK);
			res.json(updatedFavorites);
		} catch (err) {
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		try {
			if (!req.user) {
				throw new RouteError(
					HttpStatusCodes.UNAUTHORIZED,
					"You are not authorized",
				);
			}

			const favorites = await Favorites.findOne({ user: req.user._id });

			if (!favorites) {
				throw new RouteError(
					HttpStatusCodes.NOT_FOUND,
					"Favorites for user probably already have been removed",
				);
			}

			await favorites.remove();

			res.setHeader("Content-Type", "application/json");
			res.status(HttpStatusCodes.OK);
			res.json({});
		} catch (err) {
			next(err);
		}
	});

favoritesRouter
	.route("/:dishId")
	.all(PassportAuthService.verifyUser)
	.post(async (req, res, next) => {
		try {
			const { dishId } = req.params;

			if (!req.user) {
				throw new RouteError(
					HttpStatusCodes.UNAUTHORIZED,
					"You are not authorized",
				);
			}

			const favorites = await Favorites.findOne({ user: req.user._id });

			if (!favorites) {
				throw new RouteError(
					HttpStatusCodes.NOT_FOUND,
					"Favorites for user are not found",
				);
			}

			if (favorites.dishes.some((dish) => dish.equals(dishId))) {
				throw new RouteError(
					HttpStatusCodes.FORBIDDEN,
					"This dish is already on the list",
				);
			}

			favorites.dishes.push(new Types.ObjectId(dishId));
			await favorites.save();

			const updatedFavorites = await Favorites.findOne({
				user: req.user._id,
			});

			res.setHeader("Content-Type", "application/json");
			res.status(HttpStatusCodes.OK);
			res.json(updatedFavorites);
		} catch (err) {
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		try {
			const { dishId } = req.params;

			if (!req.user) {
				throw new RouteError(
					HttpStatusCodes.UNAUTHORIZED,
					"You are not authorized",
				);
			}

			const favorites = await Favorites.findOne({
				user: req.user._id,
			}).populate(["user", "dishes"]);

			if (!favorites) {
				throw new RouteError(
					HttpStatusCodes.NOT_FOUND,
					"Favorites for user are not found",
				);
			}

			if (favorites.dishes.some((dish) => dish.equals(dishId))) {
				throw new RouteError(
					HttpStatusCodes.FORBIDDEN,
					"This dish is already removed",
				);
			}

			// @ts-expect-error
			(favorites.dishes as DishDocument).id(dishId).remove();

			res.setHeader("Content-Type", "application/json");
			res.status(HttpStatusCodes.OK);
			res.json();
		} catch (err) {
			next(err);
		}
	});

export { favoritesRouter };
