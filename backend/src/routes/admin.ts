import express, {Request, Response} from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { createStudent, createWarden, deleteStudent, deleteWarden, getSingleStudent, getSingleWarden, getStudents, getwardens, updateStudent } from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.use(verifyToken);
adminRouter.use(authorizeRole("ADMIN"));

adminRouter.post("/create-student", (req: Request, res: Response) => createStudent(req, res));

adminRouter.get("/students", (req: Request, res: Response) => getStudents(req, res));

adminRouter.get("/student/:id", (req: Request, res: Response) => getSingleStudent(req, res));

adminRouter.post("/create-warden", (req: Request, res: Response) => createWarden(req, res));

adminRouter.get("/wardens", (req: Request, res: Response) => getwardens(req, res));

adminRouter.get("/warden/:id", (req: Request, res: Response) => getSingleWarden(req, res));

adminRouter.delete("/student/:id", (req: Request, res: Response) => deleteStudent(req, res));

adminRouter.delete("/warden/:id", (req: Request, res: Response) => deleteWarden(req, res));

adminRouter.put("/student/:id", (req: Request, res: Response) => updateStudent(req, res));

adminRouter.put("/warden/:id", (req: Request, res: Response) => updateWarden(req, res));


export default adminRouter;