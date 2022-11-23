import { RouteError } from "../types/RouteError";
import Users from "../models/user";
import HttpStatusCodes from "../constants/HttpStatusCodes";

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
        const user = await Users.findOne({ username, password });

        if (!user) {
          throw new RouteError(HttpStatusCodes.NOT_FOUND, "User was removed");
        }

        if (user.password !== password) {
          throw new RouteError(
            HttpStatusCodes.UNAUTHORIZED,
            "Password was changed"
          );
        }

        return next();
      }
    }

    const { username, password } = req.body;
    if (username || password) {
      const user = await Users.findOne({ username, password });

      if (!user) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, "User does not exist");
      }

      if (user.password !== password) {
        throw new RouteError(HttpStatusCodes.UNAUTHORIZED, "Wrong password");
      }

      req.session.user = username;
      return next();
    }

    res.setHeader("WWW-Authenticate", "Basic");
    res.status(HttpStatusCodes.UNAUTHORIZED);
    next(
      new RouteError(HttpStatusCodes.UNAUTHORIZED, "You are not authorized")
    );
  } catch (err) {
    next(err);
  }
};
