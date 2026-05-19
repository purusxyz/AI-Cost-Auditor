import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import connectDB from "./db/database.js"
import router from "./routes/message.route.js";

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin:[
            "http://localhost:3000",
            "http://localhost:5174",
            "http://localhost:5173"
            // add production url here when deployed
        ],
        credentials: true,
        

    }
));

// API route

app.use("/v1/api", router)

const PORT = 5000;

export { app }
