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
exports.getAllStudents = exports.removeStudent = exports.inactiveStudent = void 0;
const client_1 = require("@prisma/client");
const userSelector_1 = require("../../selectors/userSelector");
const prisma = new client_1.PrismaClient();
const inactiveStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const student = yield prisma.user.findFirst({
            where: {
                id,
                hostelId,
                role: "STUDENT",
                isActive: false
            }
        });
        if (!student) {
            return res.status(404).json({
                msg: "Inactive student not found"
            });
        }
        yield prisma.user.update({
            where: { id },
            data: {
                isActive: true
            }
        });
        return res.status(200).json({
            msg: "Student activated successfully"
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
});
exports.inactiveStudent = inactiveStudent;
const removeStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const studentId = req.params.studentId;
        const student = yield prisma.student.findFirst({
            where: { id: studentId, hostelId },
        });
        if (!student) {
            return res.status(404).json({
                msg: "Student not found",
            });
        }
        const roomId = student.roomId;
        if (!roomId) {
            return res.status(400).json({
                msg: "Student is not assigned to any room",
            });
        }
        yield prisma.student.update({
            where: { id: studentId },
            data: {
                roomId: null,
            },
        });
        const room = yield prisma.room.findUnique({
            where: { id: roomId },
        });
        if (!room) {
            return res.status(404).json({
                msg: "Room not found",
            });
        }
        const newOccupancy = room.occupancy - 1;
        let newStatus = client_1.RoomStatus.AVAILABLE;
        if (room.status === client_1.RoomStatus.MAINTENANCE) {
            newStatus = client_1.RoomStatus.MAINTENANCE;
        }
        else if (newOccupancy >= room.capacity) {
            newStatus = client_1.RoomStatus.FULL;
        }
        yield prisma.room.update({
            where: { id: roomId },
            data: {
                occupancy: newOccupancy,
                status: newStatus,
            },
        });
        return res.status(200).json({
            msg: "Student removed from room",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error",
        });
    }
});
exports.removeStudent = removeStudent;
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const students = yield prisma.user.findMany({
            where: {
                hostelId: hostelId,
                role: "STUDENT",
                isActive: true,
            },
            select: Object.assign(Object.assign({}, userSelector_1.safeUserSelect), { student: {
                    select: {
                        id: true,
                        regNo: true,
                        room: {
                            select: {
                                id: true,
                                number: true,
                            },
                        },
                    },
                }, hostel: {
                    select: {
                        name: true,
                    },
                } }),
        });
        return res.status(200).json({
            students,
            total: students.length,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!",
        });
    }
});
exports.getAllStudents = getAllStudents;
