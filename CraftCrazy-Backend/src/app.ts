import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import { errorHandler } from "./middlewares/error.middleware";


dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/products", productRoutes);
app.use("/api",routes);

//check route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API is running...");
});

// Global error handler
app.use(errorHandler);

export default app;
