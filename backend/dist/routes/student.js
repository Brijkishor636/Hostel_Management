"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const studentRouter = express_1.default.Router();
studentRouter.use(authMiddleware_1.verifyToken);
studentRouter.use((0, roleMiddleware_1.authorizeRole)("STUDENT"));
studentRouter.get("/me", (req, res) => (0, userController_1.getSelfDetails)(req, res));
studentRouter.put("/update-selfdetail", (req, res) => (0, userController_1.updateSelfProfile)(req, res));
exports.default = studentRouter;
