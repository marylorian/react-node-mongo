import express from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";

import Dishes from "../models/dishes";
import { RouteError } from "../types/RouteError";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";

const dishRouter = express.Router();

dishRouter
	.route("/")
	.get(async (req, res, next) => {
		try {
			const dishes = await Dishes.find({});

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dishes);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { name, description } = req.body;

			const dish = await Dishes.create({ name, description });

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.put(PassportAuthService.verifyUser, (req, res, next) => {
		res.send(`PUT all dishes`);
	})
	.delete(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const response = await Dishes.remove({});

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(response);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

dishRouter
	.route("/:dishId")
	.get(async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(PassportAuthService.verifyUser, (req, res, next) => {
		const { dishId } = req.params;
		res.send(`POST dish ${dishId}`);
	})
	.put(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const { name, description } = req.body;

			const dish = await Dishes.findByIdAndUpdate(
				dishId,
				{ $set: { name, description } },
				{ new: true },
			);

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.delete(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findByIdAndRemove(dishId);

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

dishRouter
	.route("/:dishId/comments")
	.get(async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dish.comments);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(PassportAuthService.verifyUser, (req, res, next) => {
		const { dishId } = req.params;
		res.statusCode = HttpStatusCodes.BAD_REQUEST;
		res.send(`POST dish ${dishId}/comments is not implemented`);
	})
	.put(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			const { rating, author, comment } = req.body;

			if (!dish.comments) {
				throw new RouteError(
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					"Dish has no comments to add new one",
				);
			}

			dish.comments.push({
				rating,
				author,
				comment,
			});

			const updatedDish = await dish.save();

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(updatedDish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.delete(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			if (!dish.comments) {
				throw new RouteError(
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					"Dish has no comments to remove this one",
				);
			}

			dish.comments.remove({});

			const updatedDish = await dish.save();

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(updatedDish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

dishRouter
	.route("/:dishId/comments/:commentId")
	.get(async (req, res, next) => {
		try {
			const { dishId, commentId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			if (!dish.comments) {
				throw new RouteError(
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					"Dish has no comments to get this one",
				);
			}

			const comment = dish.comments.id(commentId);

			if (!comment) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Comment ${commentId} was not found`);
			}

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(comment);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(PassportAuthService.verifyUser, (req, res, next) => {
		const { dishId, commentId } = req.params;
		res.statusCode = HttpStatusCodes.BAD_REQUEST;
		res.send(`POST ${dishId}/comments/${commentId} is not implemented`);
	})
	.put(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { dishId, commentId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			if (!dish.comments) {
				throw new RouteError(
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					"Dish has no comments to get this one",
				);
			}

			const comment = dish.comments.id(commentId);

			if (!comment) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Comment ${commentId} was not found`);
			}

			const { rating, comment: commentText } = req.body;

			rating && comment.set({ rating });
			commentText && comment.set({ comment: commentText });

			const updatedDish = await dish.save();

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(updatedDish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.delete(PassportAuthService.verifyUser, async (req, res, next) => {
		try {
			const { dishId, commentId } = req.params;
			const dish = await Dishes.findById(dishId);

			if (!dish) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Dish ${dishId} was not found`);
			}

			if (!dish.comments) {
				throw new RouteError(
					HttpStatusCodes.INTERNAL_SERVER_ERROR,
					"Dish has no comments to get this one",
				);
			}

			const comment = dish.comments.id(commentId);

			if (!comment) {
				res.statusCode = HttpStatusCodes.NOT_FOUND;
				res.setHeader("Content-Type", "application/json");

				throw Error(`Comment ${commentId} was not found`);
			}

			comment.remove();

			const updatedDish = await dish.save();

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(updatedDish);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

export { dishRouter };
