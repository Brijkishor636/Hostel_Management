import express from "express"
import { chatController } from "../controller/chatController";

const chatRouter = express.Router();

chatRouter.post("/", chatController);

export default chatRouter;