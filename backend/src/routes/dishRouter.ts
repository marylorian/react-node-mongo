import express from "express";

import { HttpCode } from "../constants/httpCodes";

const dishRouter = express.Router();

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = HttpCode.Success;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.send(`GET all dishes`);
  })
  .post((req, res, next) => {
    res.send(`POST all dishes`);
  })
  .put((req, res, next) => {
    res.send(`PUT all dishes`);
  })
  .delete((req, res, next) => {
    res.send(`DELETE all dishes`);
  });

dishRouter
  .route("/:dishId")
  .all((req, res, next) => {
    res.statusCode = HttpCode.Success;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    const { dishId } = req.params;
    res.send(`GET dish ${dishId}`);
  })
  .post((req, res, next) => {
    const { dishId } = req.params;
    res.send(`POST dish ${dishId}`);
  })
  .put((req, res, next) => {
    const { dishId } = req.params;
    res.send(`PUT dish ${dishId}`);
  })
  .delete((req, res, next) => {
    const { dishId } = req.params;
    res.send(`DELETE dish ${dishId}`);
  });

export { dishRouter };
