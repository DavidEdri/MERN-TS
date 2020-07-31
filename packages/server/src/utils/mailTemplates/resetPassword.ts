export const resetPasswordEmail = (email: string, token: string) => ({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Password reset",
  text: `${process.env.SITE_URL}passwordreset/${token}`,
});
