import express from "express";

import { HttpCode } from "../constants/httpCodes";

const leaderRouter = express.Router();

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = HttpCode.Success;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.send(`GET all leaders`);
  })
  .post((req, res, next) => {
    res.send(`POST all leaders`);
  })
  .put((req, res, next) => {
    res.send(`PUT all leaders`);
  })
  .delete((req, res, next) => {
    res.send(`DELETE all leaders`);
  });

leaderRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = HttpCode.Success;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    const { leaderId } = req.params;
    res.send(`GET leader ${leaderId}`);
  })
  .post((req, res, next) => {
    const { leaderId } = req.params;
    res.send(`POST leader ${leaderId}`);
  })
  .put((req, res, next) => {
    const { leaderId } = req.params;
    res.send(`PUT leader ${leaderId}`);
  })
  .delete((req, res, next) => {
    const { leaderId } = req.params;
    res.send(`DELETE leader ${leaderId}`);
  });

export { leaderRouter };
