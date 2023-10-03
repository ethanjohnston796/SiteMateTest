import express, { Express } from "express";
import cors from "cors";

import issueRouter from "./route/api/issue";
import connectDB from "./utils/connectDB";

const app: Express = express();
const port: Number = process.env.PORT ? Number(process.env.PORT) : 5000;
const api_version: String = process.env.API_VERSION;

connectDB();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/${api_version}/issue`, issueRouter);

app.listen(port, () => {
  console.log(`🚀Server is listening on ${port}🚀`);
});
