import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { HttpCode } from "./constants/httpCodes";
import { dishRouter } from "./routes/dishRouter";
import { promoRouter } from "./routes/promoRouter";
import { leaderRouter } from "./routes/leaderRouter";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080;

const dbname = "confusion";
const url = `mongodb://127.0.0.1:27017/${dbname}`;

mongoose
  .connect(url)
  .then(() => console.log("Connected successfully to DB server"));

app.use(express.json());
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

// error handler
app.use((err, req, res, next) => {
  // only for dev env
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || HttpCode.InternalError);
  res.render("error");
});

app.get("/", (req, res) => {
  res.statusCode = HttpCode.Success;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
