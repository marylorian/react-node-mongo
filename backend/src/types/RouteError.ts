import { HttpCode } from "../constants/httpCodes";

/**
 * Error with status code and message
 */
export class RouteError extends Error {
  status: HttpCode;
  constructor(status: HttpCode, message: string) {
    super(message);
    this.status = status;
  }
}
