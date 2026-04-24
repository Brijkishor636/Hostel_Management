import express, {Request, Response} from "express";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { getMyPayments, payPayment } from "../controller/studentPaymentController";

const studentRouter = express.Router();

studentRouter.use(verifyToken);
studentRouter.use(authorizeRole("ADMIN", "WARDEN", "STUDENT"));

studentRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

studentRouter.put("/update-selfdetail", (req: Request, res: Response) => updateSelfProfile(req, res));

studentRouter.get("/payments", (req: Request, res: Response) => getMyPayments(req, res));
studentRouter.post("/payments/pay", (req: Request, res: Response) => payPayment(req, res));

export default studentRouter;