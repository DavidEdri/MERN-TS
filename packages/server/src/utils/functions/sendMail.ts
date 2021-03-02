import nodemailer from "nodemailer";
import mailConfig from "../../config/mail";
import { MailBody } from "../../types/MailBody";

export const sendMail = async (mailBody: MailBody) => {
  const transporter = nodemailer.createTransport(mailConfig);
  await transporter.sendMail(mailBody);
};
