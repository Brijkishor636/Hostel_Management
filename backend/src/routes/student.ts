import express, {Request, Response} from "express";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { createComplaint, getMyComplaints } from "../controller/student/complaintController";
import { getAllComplaints, getComplaintById } from "../controller/admin/complaintController";
import { getAllNotices } from "../controller/noticeController";
import { getMyDues, getMyPayments, getMyTransactions, getStudentDashboard } from "../controller/student/paymentController";
import { getMyRoom } from "../controller/student/roomController";

const studentRouter = express.Router();

studentRouter.use(verifyToken);
studentRouter.use(authorizeRole("STUDENT"));

studentRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

studentRouter.put("/update-selfdetail", (req: Request, res: Response) => updateSelfProfile(req, res));


studentRouter.get("/room", getMyRoom);

studentRouter.get("/complaints", getAllComplaints);
studentRouter.post("/complaints", createComplaint);
studentRouter.get("/complaints", getMyComplaints);
studentRouter.get("/complaints/:id", getComplaintById);


studentRouter.get("/payments", getMyPayments);              
studentRouter.get("/transactions", getMyTransactions);      
studentRouter.get("/dues", getMyDues);  
studentRouter.get("/dashboard", getStudentDashboard);                                        


studentRouter.get("/notices", getAllNotices);

export default studentRouter;