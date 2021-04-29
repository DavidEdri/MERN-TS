import mongoose from "mongoose";
import { Statics, UserDocument } from "./Document";
import { UserSchema } from "./schema";

export default mongoose.model<UserDocument, Statics>("users", UserSchema);
