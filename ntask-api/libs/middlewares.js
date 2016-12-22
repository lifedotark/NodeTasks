import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import logger from "./logger.js";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

module.exports = app => {
	app.set("port",process.env.PORT || 8080);
	app.set("ip",process.env.IP || "0.0.0.0");
	app.set("json spaces", 4);
	app.use(morgan("common",{
		stream:{
			write:(message)=>{
				logger.info(message);
			}
		}
	}))
	app.use(helmet());
	app.use(cors({
		origin:["http://localhost:8080"],
		merhods:["GET","PUT","POST","DELETE"],
		allowedHeaders:["Content-Type","Authorization"]
	}));
	app.use(compression());
	app.use(bodyParser.json())
	app.use(app.auth.initialize());
	app.use((req, res, next) => {
		delete req.body.id;
		next();
	})
	app.use(express.static("public"));
};
