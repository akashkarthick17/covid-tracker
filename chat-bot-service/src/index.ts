import bodyParser from "body-parser";
import compression from "compression"; // compresses requests
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressValidator from "express-validator";
import path from "path";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import winston from "winston";

// Load configuration file.
dotenv.config({ path: 'src/config/.env', silent: true });

useContainer(Container);

const isProd = process.env.ENV === "PROD";

/**
 * Express configuration.
 */
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

/**
 * Winston Config
 */
winston.transports.Console.level = (isProd ? "warn" : "debug");

/**
 * Create Express server.
 */
useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.ts", __dirname + "/controllers/*.js"
  ]
});


/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d", app.get("port"));
  console.log("Build Environment (ENV): ", process.env.ENV);
});

module.exports = app;