import express, {Request, Response} from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { createStudent, createWarden, deleteStudent, deleteWarden, getAdmins, getSingleStudent, getSingleWarden, getStudents, getwardens, updateStudent, updateUser} from "../controller/adminController";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { allocateRoom } from "../controller/roomController";

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

adminRouter.put("/user/:id", (req: Request, res: Response) => updateUser(req, res));

adminRouter.get("/admins", (req: Request, res: Response) => getAdmins(req, res));

adminRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

adminRouter.put("/update-selfprofile", (req: Request, res: Response) => updateSelfProfile(req, res));

adminRouter.post("/rooms/allocate", (req: Request, res: Response) => allocateRoom(req, res));


export default adminRouter;