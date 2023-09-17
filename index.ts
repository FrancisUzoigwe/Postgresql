import express from "express";
import { mainApp } from "./mainApp";

const app = express();

const port: number = 4200;
const realPort = port;

mainApp(app);
const Server = app.listen(realPort, () => {
  console.log("Server is live and listening on port", realPort);
});

process.on("uncaughtException", (err) => {
  console.log("");
  console.log("Server is shutting down due to uncaught exception");

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("");
  console.log("Server is shutting down due to unhandled rejection", reason);

  Server.close(() => {
    process.exit(1);
  });
});
