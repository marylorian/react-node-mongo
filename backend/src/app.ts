import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import logger from "jet-logger";
import session from "express-session";
import sessionFileStore from "session-file-store";

import { HttpCode } from "./constants/httpCodes";
import { Environments } from "./constants/environments";
import { dishRouter } from "./routes/dishRouter";
import { promoRouter } from "./routes/promoRouter";
import { leaderRouter } from "./routes/leaderRouter";
import { indexRouter } from "./routes/indexRouter";
import { RouteError } from "./types/RouteError";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080;
const FileStore = sessionFileStore(session);

const dbname = "confusion";
const url = `mongodb://127.0.0.1:27017/${dbname}`;

mongoose
  .connect(url)
  .then(() => console.log("Connected successfully to DB server"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    resave: false,
    store: new FileStore({}),
  })
);

// Show routes called in console during development
if (process.env.NODE_ENV === Environments.Dev) {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === Environments.Prod) {
  app.use(helmet());
}

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.session.user) {
    return next();
  }

  if (authHeader) {
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    if (username === "admin" && password === "password") {
      req.session.user = "admin";
      return next();
    }
  }

  res.setHeader("WWW-Authenticate", "Basic");
  res.status(HttpCode.Unauthorized);
  next(new RouteError(HttpCode.Unauthorized, "You are not authorized"));
};

app.use(basicAuth);

app.use("/", indexRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

// error handler
app.use((err, req, res, next) => {
  logger.err(err, true);
  return res
    .status(err.status || HttpCode.InternalError)
    .json({ error: err.message });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
