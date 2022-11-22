import express from "express";

import { HttpCode } from "../constants/httpCodes";
import Leaders from "../models/leaders";

const leaderRouter = express.Router();

leaderRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const leaders = await Leaders.find({});

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(leaders);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post((req, res, next) => {
    res.statusCode = HttpCode.BadRequest;
    res.send(`POST all leaders not implemented yet`);
  })
  .put(async (req, res, next) => {
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

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(leaders);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const response = await Leaders.remove({});

      res.statusCode = HttpCode.Success;
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
        res.statusCode = HttpCode.NotFound;
        res.setHeader("Content-Type", "application/json");

        throw Error(`Leader ${leaderId} was not found`);
      }

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(leader);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post((req, res, next) => {
    const { leaderId } = req.params;
    res.send(`POST leaders/${leaderId} is not implemented yet`);
  })
  .put(async (req, res, next) => {
    try {
      const { leaderId } = req.params;

      const leader = await Leaders.findByIdAndUpdate(
        leaderId,
        { $set: req.body },
        { new: true }
      );

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(leader);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { leaderId } = req.params;

      const response = await Leaders.findByIdAndRemove(leaderId);

      res.statusCode = HttpCode.Success;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export { leaderRouter };
