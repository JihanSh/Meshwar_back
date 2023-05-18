import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import user from "./routes/user.js";
import activity from "./routes/activity.js";
import places from "./routes/places.js";
import cookieParser from "cookie-parser";
import feedbacks from "./routes/feedback.js";

dotenv.config();
await connectDB();
const PORT = process.env.PORT || 5000;
const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("images"));

app.use(cookieParser());
app.use("/user",user)
app.use("/activity", activity);
app.use("/place", places);
app.use("/feedback", feedbacks);

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
); 