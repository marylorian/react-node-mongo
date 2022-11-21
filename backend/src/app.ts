import express from "express";
import dotenv from "dotenv";

import { HttpCode } from "./constants/httpCodes";
import { dishRouter } from "./routes/dishRouter";
import { promoRouter } from "./routes/promoRouter";
import { leaderRouter } from "./routes/leaderRouter";

import "./services/MongoService/MongoService";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.static(__dirname + "/public"));
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

app.get("/", (req, res) => {
  res.statusCode = HttpCode.Success;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
