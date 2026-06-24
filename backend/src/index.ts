import "dotenv/config";
import { app } from "./app.js"
import connectDB from "./db/database.js"

const PORT = process.env.PORT || 8000;

//dotenv.config()
connectDB()
.then(()=> {
      app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
})
    
}).catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
})
