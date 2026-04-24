import app from "../app.js";
import connectDB from "../v1/config/db.config.js";

await connectDB();

export default app;