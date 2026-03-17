// Sử dụng require kết hợp với kiểu dữ liệu của TS
import express from "express";
import type { Request, Response } from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
