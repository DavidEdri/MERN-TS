import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { BaseUser } from "./DocumentType";
import { UserFunctions } from "./functions";

const { methods, statics } = UserFunctions;

export type UserDocument = BaseUser & typeof methods;
type Statics = Model<UserDocument> & typeof statics;

const UserSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

UserSchema.statics.checkDuplicates = statics.checkDuplicates;

UserSchema.methods.generateJWT = methods.generateJWT;
UserSchema.methods.matchPassword = methods.matchPassword;

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

export default mongoose.model<UserDocument, Statics>("users", UserSchema);
