export type UserFields = {
  _id: string;
  name: string;
  email: string;
  password: string;
  rank: number;
  active: boolean;
  activateToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
};
