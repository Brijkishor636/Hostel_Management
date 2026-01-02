import express, {Request, Response} from "express"
import { createStudent, getSingleStudent, getStudents, updateStudent } from "../controller/adminController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { getSelfDetails, updateSelfProfile } from "../controller/userController";
import { allocateRoom, createRooms, deleteRoom, getAllRooms, getSingleRoom, updateRoom } from "../controller/roomController";

const wardenRouter = express.Router();

wardenRouter.use(verifyToken);
wardenRouter.use(authorizeRole("WARDEN"));

wardenRouter.post("/create-student", (req: Request, res: Response) => createStudent(req, res));

wardenRouter.get("/students", (req: Request, res: Response) => getStudents(req, res));

wardenRouter.get("/student/:id", (req: Request, res: Response) => getSingleStudent(req, res));

wardenRouter.put("/student/:id", (req: Request, res: Response) => updateStudent(req, res));

wardenRouter.put("/update-selfprofile", (req: Request, res: Response) => updateSelfProfile(req, res));

wardenRouter.get("/me", (req: Request, res: Response) => getSelfDetails(req, res));

wardenRouter.post("/rooms/allocate", (req: Request, res: Response) => allocateRoom(req, res));

wardenRouter.post("/rooms/create", (req: Request, res: Response) => createRooms(req, res));

wardenRouter.get("/rooms", (req: Request, res: Response) => getAllRooms(req, res));

wardenRouter.get("/rooms/:roomNo", (req: Request, res: Response) => getSingleRoom(req, res));

wardenRouter.put("/rooms/update/:roomNum", (req: Request, res: Response) => updateRoom(req, res));

wardenRouter.delete("/rooms/:roomNo", (req: Request, res: Response) => deleteRoom(req, res));

export default wardenRouter;