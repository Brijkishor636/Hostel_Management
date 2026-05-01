import express, {Request, Response} from "express";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { createComplaint, getMyComplaints } from "../controller/student/complaintController";
import { getComplaintById } from "../controller/admin/complaintController";

const studentRouter = express.Router();

studentRouter.use(verifyToken);
studentRouter.use(authorizeRole("STUDENT"));

studentRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

studentRouter.put("/update-selfdetail", (req: Request, res: Response) => updateSelfProfile(req, res));



studentRouter.post("/complaints", createComplaint);
studentRouter.get("/complaints", getMyComplaints);
studentRouter.get("/complaints/:id", getComplaintById);

export default studentRouter;