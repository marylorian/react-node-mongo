import { HttpCode } from "../constants/httpCodes";
import { RouteError } from "../types/RouteError";
import Users from "../models/user";

export const basicAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const [username, password] = Buffer.from(
        authHeader.split(" ")[1],
        "base64"
      )
        .toString()
        .split(":");

      if (req.session.user && req.session.user === username) {
        return next();
      }
    }

    const { username, password } = req.body;
    if (username || password) {
      const user = await Users.findOne({ username, password });

      if (!user) {
        throw new RouteError(HttpCode.NotFound, "User does not exist");
      }

      if (user.password !== password) {
        throw new RouteError(HttpCode.Unauthorized, "Wrong password");
      }

      req.session.user = username;
      return next();
    }

    res.setHeader("WWW-Authenticate", "Basic");
    res.status(HttpCode.Unauthorized);
    next(new RouteError(HttpCode.Unauthorized, "You are not authorized"));
  } catch (err) {
    next(err);
  }
};
