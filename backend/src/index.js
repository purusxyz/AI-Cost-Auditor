import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import connectDB from "./db/database.js"

dotenv.config()
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

app.get("/api/message", (req, res) => {
    
    res.json({ message: "Hii  There !! its Purus" });

})

const PORT = 5000;

connectDB()

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});