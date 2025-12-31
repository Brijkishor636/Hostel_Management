import express, {Request, Response} from "express";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";

const studentRouter = express.Router();

studentRouter.use(verifyToken);
studentRouter.use(authorizeRole("STUDENT"));

studentRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

studentRouter.put("/update-selfdetail", (req: Request, res: Response) => updateSelfProfile(req, res));

export default studentRouter;