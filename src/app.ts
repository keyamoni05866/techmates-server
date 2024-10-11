import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//application routes

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental Reservation Management System");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
