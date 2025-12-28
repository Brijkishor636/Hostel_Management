import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
