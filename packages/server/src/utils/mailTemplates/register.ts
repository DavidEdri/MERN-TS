import { MailBody } from "../../types/MailBody";

export const registerEmail = (email: string, token: string): MailBody => ({
  from: process.env.SITE_MAIL,
  to: email,
  subject: "Activate Your account",
  text: `${process.env.SITE_URL}activate/${token}`,
});
