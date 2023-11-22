import express from "express";

import { conection } from "./db/conection.js";

import router from "./routes/routes.js";

import cors from "cors";

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

app.use(router);

conection();

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
