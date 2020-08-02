export const registerEmail = (email: string, token: string) => ({
  from: process.env.SITE_MAIL,
  to: email,
  subject: "Activate Your account",
  text: `${process.env.SITE_URL}activate/${token}`,
});
