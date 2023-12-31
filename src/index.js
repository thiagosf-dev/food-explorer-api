`use strict`;

require(`dotenv/config`);
require(`express-async-errors`);
const cors = require(`cors`);
const express = require(`express`);
const AppError = require(`./utils/AppError`);
const routes = require(`./routes`);
const uploadConfig = require("./configs/upload.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      `http://localhost:5173/`,
      `http://localhost:5173`,
      `hpp://127.0.0.1/5173/`,
      `hpp://127.0.0.1/5173`,
    ],
    credentials: true,
  })
);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

const PORT = Number(process.env.PORT) || 3030;

app.get(`/status`, (_request, response) =>
  response.status(200).json({
    API_STATUS: `running`,
    API_PORT: process.env.PORT || PORT,
    API_NAME: `foodexplorerapi`,
  })
);

app.use((error, request, response, next) => {
  console.error(`⛔`, error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: `error`,
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  return response.status(500).json({
    status: `error`,
    message: `Internal server error`,
    messageLog: error.message,
    statusCode: error.statusCode,
  });
});

app.listen(PORT, () =>
  console.info(`Server running in http://localhost:${PORT}`)
);
