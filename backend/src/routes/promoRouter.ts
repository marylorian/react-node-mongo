import express from "express";

import { HttpCode } from "../constants/httpCodes";
import Promotions from "../models/promotions";

const promoRouter = express.Router();

promoRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const promos = await Promotions.find({});

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(promos);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post((req, res, next) => {
    res.statusCode = HttpCode.BadRequest;
    res.send(`POST all promotions not implemented yet`);
  })
  .put(async (req, res, next) => {
    try {
      const { name, image, label, price, description, featured } = req.body;

      const promos = await Promotions.create({
        name,
        image,
        label,
        price,
        description,
        featured,
      });

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(promos);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const response = await Promotions.remove({});

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

promoRouter
  .route("/:promoId")
  .get(async (req, res, next) => {
    try {
      const { promoId } = req.params;

      const promo = await Promotions.findById(promoId);

      if (!promo) {
        res.statusCode = HttpCode.NotFound;
        res.setHeader("Content-Type", "application/json");

        throw Error(`Promotion ${promoId} was not found`);
      }

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(promo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post((req, res, next) => {
    const { promoId } = req.params;
    res.send(`POST promotions/${promoId} is not implemented yet`);
  })
  .put(async (req, res, next) => {
    try {
      const { promoId } = req.params;

      const promo = await Promotions.findByIdAndUpdate(
        promoId,
        { $set: req.body },
        { new: true }
      );

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(promo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { promoId } = req.params;

      const response = await Promotions.findByIdAndRemove(promoId);

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export { promoRouter };
