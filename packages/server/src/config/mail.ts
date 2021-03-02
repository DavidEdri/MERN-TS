export default {
  host: "smtp.sendgrid.net",
  port: 465,
  secure: true,
  auth: {
    user: "apikey",
    pass: process.env.EMAIL_API_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
