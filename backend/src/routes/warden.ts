import express, {Request, Response} from "express"
import { createStudent, deleteStudent, getInactiveStudents, getSingleStudent, getStudents, getUnassignedStudents, updateStudent } from "../controller/adminController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { allocateRoom, createRooms, deleteRoom, getAllRooms, getRooms, getSingleRoom, updateRoom } from "../controller/roomController";
import { getAllStudents, inactiveStudent, removeStudent } from "../controller/admin/studentController";

const wardenRouter = express.Router();

wardenRouter.use(verifyToken);
wardenRouter.use(authorizeRole("ADMIN","WARDEN"));

wardenRouter.post("/create-student", (req: Request, res: Response) => createStudent(req, res));

wardenRouter.get("/students", (req: Request, res: Response) => getStudents(req, res));

wardenRouter.get("/student/:id", (req: Request, res: Response) => getSingleStudent(req, res));

wardenRouter.put("/student/:id", (req: Request, res: Response) => updateStudent(req, res));

wardenRouter.put("/update-selfprofile", (req: Request, res: Response) => updateSelfProfile(req, res));

wardenRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

wardenRouter.post("/rooms/allocate", (req: Request, res: Response) => allocateRoom(req, res));

wardenRouter.post("/rooms/create", (req: Request, res: Response) => createRooms(req, res));

wardenRouter.get("/rooms", (req: Request, res: Response) => getRooms(req, res));

wardenRouter.get("/rooms/:id", (req: Request, res: Response) => getSingleRoom(req, res));

wardenRouter.put("/rooms/update/:id", (req: Request, res: Response) => updateRoom(req, res));

wardenRouter.delete("/rooms/:id", (req: Request, res: Response) => deleteRoom(req, res));

wardenRouter.put("/rooms/remove-student/:studentId", (req: Request, res: Response) =>
  removeStudent(req, res)
);
wardenRouter.get("/unassigned-student", (req: Request, res: Response) => getUnassignedStudents(req, res));



wardenRouter.get("/inactive-students", (req: Request, res: Response) => getInactiveStudents(req, res));
wardenRouter.put("/inactive/:id", (req: Request, res: Response) => inactiveStudent(req, res));
wardenRouter.delete("/student/:id", (req: Request, res: Response) => deleteStudent(req, res));

wardenRouter.get("/allstudents", (req: Request, res: Response) => getAllStudents(req, res));
wardenRouter.get("/allrooms", (req: Request, res: Response) => getAllRooms(req, res));

export default wardenRouter;