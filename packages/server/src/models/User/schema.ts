import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UserDocument } from "./Document";
import { methods, statics } from "./functions";

export const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    default: 1,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activateToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

UserSchema.statics.checkDuplicates = statics.checkDuplicates;

UserSchema.methods.generateJWT = methods.generateJWT;
UserSchema.methods.matchPassword = methods.matchPassword;
UserSchema.methods.userToJSON = methods.userToJSON;

UserSchema.pre<UserDocument>("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (e, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
