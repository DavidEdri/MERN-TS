import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";

import { logger } from "./utils/logger";
import routes from "./routes";
import { passportConfig } from "./config"; // need to load after routes

const app = express();
const publicFolder = path.join(__dirname, "public");
const env = process.env.NODE_ENV || "development";

const db = env === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

if (!db) throw new Error("no db provided on .env");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("DB Connected"))
  .catch((err) => logger.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicFolder)); // serve static folder
app.use(passport.initialize());

passportConfig(passport);

routes(app, passport.authenticate("jwt", { session: false }));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: publicFolder });
});

export default app;
