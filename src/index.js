"use strict";

require("dotenv/config");
const express = require("express");

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3030;

app.get(`/status`, (_request, response) =>
  response.status(200).json({
    API_STATUS: `running`,
    API_PORT: process.env.PORT || PORT,
    API_NAME: `foodexplorerapi`,
  })
);

app.listen(PORT, () =>
  console.info(`Server running in http://localhost:${PORT}`)
);
