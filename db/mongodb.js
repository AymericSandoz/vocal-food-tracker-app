import mongoose from "mongoose";
import "dotenv/config";
const dbpassword = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;
const MONGOURL = process.env.MONGOURL;

mongoose
  .connect(MONGOURL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
