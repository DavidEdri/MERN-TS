export type MailBody = {
  from: string | undefined;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};
