import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import logger from "jet-logger";
import passport from "passport";

import config from "./config/config";
import { Environments } from "./constants/environments";
import HttpStatusCodes from "./constants/HttpStatusCodes";
import { dishRouter } from "./routes/dishRouter";
import { promoRouter } from "./routes/promoRouter";
import { leaderRouter } from "./routes/leaderRouter";
import { indexRouter } from "./routes/indexRouter";
import { userRouter } from "./routes/userRouter";
import { uploadRouter } from "./routes/uploadRouter";

const app = express();

// https
app.all("*", (req, res, next) => {
	if (req.secure) {
		return next();
	}
	res.redirect(
		HttpStatusCodes.TEMPORARY_REDIRECT,
		`https://${req.hostname}:${app.get("secPort")}${req.url}`,
	);
});

mongoose
	.connect(config.dataBaseUrl /*, { useMongoClient: true }*/)
	.then(() => console.log("Connected successfully to DB server"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (config.environment === Environments.Dev) {
	app.use(morgan("dev"));
}

// Security
if (config.environment === Environments.Prod) {
	app.use(helmet());
}

app.use(passport.initialize());
import "./services/PassportAuthService/PasportAuthService";

app.use("/", indexRouter);
app.use("/auth", userRouter);

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
app.use("/image-upload", uploadRouter);

// error handler
app.use((err, req, res, next) => {
	logger.err(err, true);
	return res
		.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
		.json({ error: err.message });
});

app.listen(config.port, () => {
	return console.log(
		`Express is listening at http://localhost:${config.port}`,
	);
});

export default app;
