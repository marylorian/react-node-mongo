import express from "express";

import { HttpCode } from "../constants/httpCodes";

const promoRouter = express.Router();

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = HttpCode.Success;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.send(`GET all promotions`);
  })
  .post((req, res, next) => {
    res.send(`POST all promotions`);
  })
  .put((req, res, next) => {
    res.send(`PUT all promotions`);
  })
  .delete((req, res, next) => {
    res.send(`DELETE all promotions`);
  });

promoRouter
  .route("/:promoId")
  .all((req, res, next) => {
    res.statusCode = HttpCode.Success;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    const { promoId } = req.params;
    res.send(`GET promotion ${promoId}`);
  })
  .post((req, res, next) => {
    const { promoId } = req.params;
    res.send(`POST promotion ${promoId}`);
  })
  .put((req, res, next) => {
    const { promoId } = req.params;
    res.send(`PUT promotion ${promoId}`);
  })
  .delete((req, res, next) => {
    const { promoId } = req.params;
    res.send(`DELETE promotion ${promoId}`);
  });

export { promoRouter };
