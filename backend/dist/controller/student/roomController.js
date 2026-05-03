"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyRoom = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMyRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const student = yield prisma.student.findUnique({
            where: { userId },
            include: {
                room: true,
            },
        });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.json({
            room: student.room
                ? {
                    id: student.room.id,
                    number: student.room.number,
                    capacity: student.room.capacity,
                    occupancy: student.room.occupancy,
                    status: student.room.status,
                }
                : null,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error fetching room" });
    }
});
exports.getMyRoom = getMyRoom;
