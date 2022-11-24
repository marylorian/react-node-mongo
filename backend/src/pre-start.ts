import http from "http";
import https from "https";
import fs from "fs";

import app from "./app";
import config from "./config/config";

app.set("port", config.port);
app.set("secPort", `8443`);

const onError = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}

	switch (error.code) {
		case "EACCES":
			console.error("Port requires elevated privileges");
			process.exit(1);
		case "EADDRINUSE":
			console.error("Port is already in use");
			process.exit(1);
		default:
			throw error;
	}
};

const server = http.createServer(app);

server.on("error", onError);
server.on("listening", console.log);

const options = {
	key: fs.readFileSync("bin/private.key"),
	cert: fs.readFileSync("bin/certificate.pem"),
};
const secureServer = https.createServer(options, app);

secureServer.listen(app.get("secPort"), () => {
	console.log(`Secure server in listening on port ${app.get("secPort")}`);
});

secureServer.on("error", onError);
secureServer.on("listening", console.log);
