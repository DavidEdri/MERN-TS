/// <reference types="./types/index" />

import app from "./app";
import { logger } from "./utils/logger";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server running on port  ${port}`);
});
