export default {
  createTransport: () => ({
    sendMail: (_: any, f: any) => {
      if (f) f(undefined);
    },
  }),
};
