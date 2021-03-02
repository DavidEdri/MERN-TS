import { Document } from "mongoose";
import type { UserFields } from "@project/types";

export type BaseUser = Document & UserFields;
