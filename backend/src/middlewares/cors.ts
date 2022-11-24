import express from "express";
import corsLib from "cors";

import config from "../config/config";

const corsOptionsDelegate = (req, callback) => {
	let corsOptions;
	if (config.originsWhitelist.includes(req.header("Origin"))) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

export const cors = corsLib();
export const corsWithOptions = corsLib(corsOptionsDelegate);
