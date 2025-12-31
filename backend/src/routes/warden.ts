import express, {Request, Response} from "express"
import { createStudent, getSingleStudent, getStudents, updateStudent } from "../controller/adminController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";

const wardenRouter = express.Router();

wardenRouter.use(verifyToken);
wardenRouter.use(authorizeRole("WARDEN"));

wardenRouter.post("/create-student", (req: Request, res: Response) => createStudent(req, res));

wardenRouter.get("/students", (req: Request, res: Response) => getStudents(req, res));

wardenRouter.get("/student/:id", (req: Request, res: Response) => getSingleStudent(req, res));

wardenRouter.put("/student/:id", (req: Request, res: Response) => updateStudent(req, res));

wardenRouter.put("/update-selfprofile", (req: Request, res: Response) => updateSelfProfile(req, res));

wardenRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

export default wardenRouter;