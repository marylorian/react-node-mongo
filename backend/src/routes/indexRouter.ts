import express from "express"

import HttpStatusCodes from "../constants/HttpStatusCodes"

const indexRouter = express.Router()

indexRouter.route("/").get((req, res) => {
	res.statusCode = HttpStatusCodes.OK
	res.setHeader("Content-Type", "text/html")
	res.end("<html><body><h1>This is an Express Server</h1></body></html>")
})

export { indexRouter }
