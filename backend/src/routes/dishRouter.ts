import express from "express";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import Dishes from "../models/dishes";
import { RouteError } from "../types/RouteError";
import * as PassportAuthService from "../services/PassportAuthService/PasportAuthService";
import { cors, corsWithOptions } from "../middlewares/cors";

const dishRouter = express.Router();

dishRouter
	.route("/")
	.options(corsWithOptions, (req, res) => {
		res.status(HttpStatusCodes.OK);
	})
	.get(cors, async (req, res, next) => {
		try {
			const dishes = await Dishes.find({}).populate("comments.author");

			res.statusCode = HttpStatusCodes.OK;
			res.setHeader("Content-Type", "application/json");
			res.json(dishes);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
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
		},
	)
	.put(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			res.send(`PUT all dishes`);
		},
	)
	.delete(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
			try {
				const response = await Dishes.remove({});

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(response);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	);

dishRouter
	.route("/:dishId")
	.options(corsWithOptions, (req, res) => {
		res.status(HttpStatusCodes.OK);
	})
	.get(cors, async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findById(dishId).populate(
				"comments.author",
			);

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
	.post(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		(req, res, next) => {
			const { dishId } = req.params;
			res.send(`POST dish ${dishId}`);
		},
	)
	.put(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
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
		},
	)
	.delete(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
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
		},
	);

dishRouter
	.route("/:dishId/comments")
	.options(corsWithOptions, (req, res) => {
		res.status(HttpStatusCodes.OK);
	})
	.get(cors, async (req, res, next) => {
		try {
			const { dishId } = req.params;
			const dish = await Dishes.findById(dishId).populate(
				"comments.author",
			);

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
	.post(corsWithOptions, PassportAuthService.verifyUser, (req, res, next) => {
		const { dishId } = req.params;
		res.statusCode = HttpStatusCodes.BAD_REQUEST;
		res.send(`POST dish ${dishId}/comments is not implemented`);
	})
	.put(
		corsWithOptions,
		PassportAuthService.verifyUser,
		async (req, res, next) => {
			try {
				const { dishId } = req.params;
				const dish = await Dishes.findById(dishId).populate(
					"comments.author",
				);

				if (!dish) {
					res.statusCode = HttpStatusCodes.NOT_FOUND;
					res.setHeader("Content-Type", "application/json");

					throw Error(`Dish ${dishId} was not found`);
				}

				const { rating, comment } = req.body;

				if (!dish.comments) {
					throw new RouteError(
						HttpStatusCodes.INTERNAL_SERVER_ERROR,
						"Dish has no comments to add new one",
					);
				}

				dish.comments.push({
					rating,
					author: req.user?._id,
					comment,
				});

				await dish.save();
				const updatedDish = await Dishes.findById(dishId).populate(
					"comments.author",
				);

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(updatedDish);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	)
	.delete(
		corsWithOptions,
		PassportAuthService.verifyUser,
		PassportAuthService.verifyAdmin,
		async (req, res, next) => {
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
		},
	);

dishRouter
	.route("/:dishId/comments/:commentId")
	.options(corsWithOptions, (req, res) => {
		res.status(HttpStatusCodes.OK);
	})
	.get(cors, async (req, res, next) => {
		try {
			const { dishId, commentId } = req.params;
			const dish = await Dishes.findById(dishId).populate(
				"comments.author",
			);

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
	.post(corsWithOptions, PassportAuthService.verifyUser, (req, res, next) => {
		const { dishId, commentId } = req.params;
		res.statusCode = HttpStatusCodes.BAD_REQUEST;
		res.send(`POST ${dishId}/comments/${commentId} is not implemented`);
	})
	.put(
		corsWithOptions,
		PassportAuthService.verifyUser,
		async (req, res, next) => {
			try {
				if (!req.user) {
					throw new RouteError(
						HttpStatusCodes.UNAUTHORIZED,
						"You are not authorize",
					);
				}

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

				if (!comment.author.equals(req.user._id)) {
					throw new RouteError(
						HttpStatusCodes.FORBIDDEN,
						"You have no permissions to change this comment",
					);
				}

				const { rating, comment: commentText } = req.body;

				rating && comment.set({ rating });
				commentText && comment.set({ comment: commentText });
				req.user._id && comment.set({ author: req.user._id });

				await dish.save();
				const updatedDish = await Dishes.findById(dishId).populate(
					"comments.author",
				);

				res.statusCode = HttpStatusCodes.OK;
				res.setHeader("Content-Type", "application/json");
				res.json(updatedDish);
			} catch (err) {
				console.error(err);
				next(err);
			}
		},
	)
	.delete(
		corsWithOptions,
		PassportAuthService.verifyUser,
		async (req, res, next) => {
			try {
				if (!req.user) {
					throw new RouteError(
						HttpStatusCodes.UNAUTHORIZED,
						"You are not authorize",
					);
				}

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

				if (!comment.author.equals(req.user._id)) {
					throw new RouteError(
						HttpStatusCodes.FORBIDDEN,
						"You have no permissions to remove this comment",
					);
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
		},
	);

export { dishRouter };
