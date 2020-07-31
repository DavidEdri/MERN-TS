import mongoose from "mongoose";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { logger } from "../utils";

const { logError } = logger;

const User = mongoose.model("users");
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload._id);

        if (user) return done(null, user);

        return done(null, false);
      } catch (error) {
        logError(error);
      }
    })
  );
};
