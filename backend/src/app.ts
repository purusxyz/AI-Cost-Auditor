import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import connectDB from "./db/database.js"
import messageRouter from "./routes/message.route.js";
import auditorRouter from "./routes/auditor.route.js"

const app: Application = express();

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

app.use("/v1/api", messageRouter)
app.use("/v1/api", auditorRouter)

const PORT = 5000;

export { app }
