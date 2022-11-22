import express from "express";

import { HttpCode } from "../constants/httpCodes";

const indexRouter = express.Router();

indexRouter.route("/").get((req, res) => {
  res.statusCode = HttpCode.Success;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

export { indexRouter };
