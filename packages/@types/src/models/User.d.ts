import { BaseFields } from "./BaseFields";

export type UserFields = BaseFields & {
  name: string;
  email: string;
  password: string;
  rank: number;
  active: boolean;
  activateToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
};
