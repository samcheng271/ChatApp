
import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
const app = express();
dotenv.config();

const port = process.env.PORT || 2000;

app.get("/", (req,res) =>{
    res.send("Hi World!!");
});

app.use("/api/auth", auth);

// app.listen(2000, () => console.log("Listening on port 2000"));

app.listen(port, () => console.log(`Listening on port ${port}`));