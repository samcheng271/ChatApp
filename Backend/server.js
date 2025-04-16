
import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import connectDB from "./DB/connectDB.js";

const port = process.env.PORT || 2000;
const app = express();
dotenv.config();


// intakes requests with json data
app.use(express.json());

// http://localhost:8000
app.get("/", (req,res) =>{
    res.send("Hi World!!");
});

// http://localhost:8000/api/auth/
app.use("/api/auth", auth);

// app.listen(2000, () => console.log("Listening on port 2000"));

app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`);
});