import express, {Request, Response} from "express";
import { changePassword, logout, signin } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";
const userRouter = express.Router();

userRouter.post("/signin", async (req: Request, res: Response) => signin(req, res));

userRouter.post("/logout", (req: Request, res: Response) => logout(req, res));

userRouter.put("/change-password",verifyToken, (req: Request, res: Response) => changePassword(req, res));

export default userRouter;