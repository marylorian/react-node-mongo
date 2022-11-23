import express from "express"

import HttpStatusCodes from "../constants/HttpStatusCodes"
import { basicAuth } from "../middlewares/auth"
import Users from "../models/user"
import { RouteError } from "../types/RouteError"

const userRouter = express.Router()

userRouter.get("/", (req, res, next) => {
	res.status(HttpStatusCodes.BAD_REQUEST)
	res.send("GET user/ not implemented yet")
})

userRouter.post("/signup", async (req, res, next) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			throw new RouteError(HttpStatusCodes.BAD_REQUEST, "Incorrect Data")
		}

		const user = await Users.findOne({ username })

		if (user) {
			throw new RouteError(
				HttpStatusCodes.FORBIDDEN,
				"Username already in use",
			)
		}

		await Users.create({
			username,
			password,
		})

		res.setHeader("Content-Type", "application/json")
		res.status(HttpStatusCodes.OK)
		return res.json({ status: "registration successful" })
	} catch (err) {
		next(err)
	}
})

userRouter.get("/login", basicAuth, async (req, res, next) => {
	try {
		res.setHeader("Content-Type", "application/json")
		res.status(HttpStatusCodes.OK)
		return res.json({ status: `login ${req.body.username} successful` })
	} catch (err) {
		next(err)
	}
})

userRouter.get("/logout", async (req, res, next) => {
	try {
		if (!req.session) {
			throw new RouteError(
				HttpStatusCodes.NOT_FOUND,
				"You are not logged in",
			)
		}

		req.session.destroy((err) => {
			if (err) {
				throw err
			}
			res.clearCookie("session-id")
			res.redirect("/")
		})
	} catch (err) {
		next(err)
	}
})

export { userRouter }
