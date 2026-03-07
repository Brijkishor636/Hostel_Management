import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import wardenRouter from "./routes/warden";
import studentRouter from "./routes/student";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/warden", wardenRouter);
app.use("/api/v1/student", studentRouter);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

export default app;
