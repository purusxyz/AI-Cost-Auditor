import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/database.js";

const PORT: number = Number(process.env.PORT) || 8000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("MONGODB connection failed !!!", err.message);
    } else {
      console.error("MONGODB connection failed !!!", err);
    }
  }
};

startServer();