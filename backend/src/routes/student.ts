import express, {Request, Response} from "express";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { getMyPayments, payPayment } from "../controller/studentPaymentController";
 import { getDashboard } from "../controller/student.controller";  // updated
const studentRouter = express.Router();

studentRouter.use(verifyToken);
studentRouter.use(authorizeRole("STUDENT"));

studentRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

studentRouter.put("/update-selfdetail", (req: Request, res: Response) => updateSelfProfile(req, res));

studentRouter.get("/payments", (req: Request, res: Response) => getMyPayments(req, res));
studentRouter.post("/payments/pay", (req: Request, res: Response) => payPayment(req, res));


studentRouter.get("/dashboard", (req: Request, res: Response) =>
  getDashboard(req, res)
);    // updated


export default studentRouter;