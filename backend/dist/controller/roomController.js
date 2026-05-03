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
exports.getAllRooms = exports.deleteRoom = exports.updateRoom = exports.getSingleRoom = exports.getRooms = exports.createRooms = exports.allocateRoom = void 0;
const roomsInput_1 = require("../inputs/roomsInput");
const client_1 = require("@prisma/client");
const roomSelector_1 = require("../selectors/roomSelector");
const prisma = new client_1.PrismaClient();
const allocateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { studentId, roomId } = req.body;
        if (!studentId || !roomId) {
            return res.status(400).json({
                msg: "StudentId and RoomId are required",
            });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const student = yield prisma.student.findFirst({
            where: { id: studentId },
        });
        if (!student || student.hostelId !== hostelId) {
            return res.status(404).json({ msg: "Student not found" });
        }
        if (student.roomId) {
            return res.status(400).json({
                msg: "Room already allocated for this student",
            });
        }
        const room = yield prisma.room.findFirst({
            where: {
                id: roomId,
                hostelId,
            },
        });
        if (!room) {
            return res.status(404).json({ msg: "Room not found" });
        }
        if (room.status === client_1.RoomStatus.MAINTENANCE) {
            return res.status(400).json({
                msg: "Room is under maintenance",
            });
        }
        if (room.occupancy >= room.capacity) {
            return res.status(400).json({
                msg: "Room is full",
            });
        }
        yield prisma.$transaction([
            prisma.student.update({
                where: { id: studentId },
                data: { roomId: room.id },
            }),
            prisma.room.update({
                where: { id: room.id },
                data: {
                    occupancy: { increment: 1 },
                    status: room.occupancy + 1 >= room.capacity
                        ? client_1.RoomStatus.FULL
                        : client_1.RoomStatus.AVAILABLE,
                },
            }),
        ]);
        return res.status(200).json({
            msg: "Room allocated successfully",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!",
        });
    }
});
exports.allocateRoom = allocateRoom;
const createRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = roomsInput_1.createRoomsInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Incorrect inputs"
            });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const roomData = parsed.data.rooms.map((r) => ({
            number: r.roomNo,
            capacity: r.capacity,
            hostelId,
        }));
        const result = yield prisma.room.createMany({
            data: roomData,
            skipDuplicates: true,
        });
        return res.status(201).json({
            msg: "Rooms created successfully",
            count: result.count,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error",
        });
    }
});
exports.createRooms = createRooms;
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skip = (page - 1) * limit;
        const total = yield prisma.room.count({
            where: { hostelId }
        });
        const rooms = yield prisma.room.findMany({
            where: { hostelId },
            skip,
            take: limit,
            orderBy: {
                number: "asc"
            },
            select: Object.assign(Object.assign({}, roomSelector_1.safeRoomSelector), { students: {
                    select: {
                        id: true,
                        regNo: true
                    }
                } })
        });
        return res.status(200).json({
            rooms,
            total,
            page,
            limit
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getRooms = getRooms;
const getSingleRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const id = req.params.id;
        const singleRoom = yield prisma.room.findFirst({
            where: {
                id,
                hostelId,
            },
            select: Object.assign(Object.assign({}, roomSelector_1.safeRoomSelector), { students: {
                    select: {
                        id: true,
                        regNo: true,
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                } }),
        });
        if (!singleRoom) {
            return res.status(404).json({
                msg: "Room not found",
            });
        }
        return res.status(200).json({
            room: singleRoom,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!",
        });
    }
});
exports.getSingleRoom = getSingleRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = roomsInput_1.updateRoomInput.safeParse(req.body);
        const id = req.params.id;
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid inputs!!",
            });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const existRoom = yield prisma.room.findFirst({
            where: { id, hostelId },
        });
        if (!existRoom) {
            return res.status(404).json({
                msg: "Room not found!!",
            });
        }
        const newCapacity = parsed.data.capacity;
        let newStatus = client_1.RoomStatus.AVAILABLE;
        if (existRoom.status === client_1.RoomStatus.MAINTENANCE) {
            newStatus = client_1.RoomStatus.MAINTENANCE;
        }
        else if (existRoom.occupancy >= newCapacity) {
            newStatus = client_1.RoomStatus.FULL;
        }
        const updatedRoom = yield prisma.room.update({
            where: { id: existRoom.id },
            data: {
                capacity: newCapacity,
                status: newStatus,
            }
        });
        return res.status(200).json({
            msg: "Room updated successfully",
            room: updatedRoom
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!",
        });
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const id = req.params.id;
        const existRoom = yield prisma.room.findFirst({
            where: { id, hostelId },
        });
        if (!existRoom) {
            return res.status(400).json({
                msg: "Room doesn't exist!!",
            });
        }
        const count = yield prisma.student.count({
            where: { roomId: id },
        });
        if (count > 0) {
            return res.status(400).json({
                msg: "Room can't be deleted, student exists",
            });
        }
        yield prisma.room.delete({
            where: { id },
        });
        return res.status(200).json({
            msg: "Room deleted successfully..",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!",
        });
    }
});
exports.deleteRoom = deleteRoom;
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const rooms = yield prisma.room.findMany({
            where: { hostelId },
            orderBy: {
                number: "asc",
            },
            select: Object.assign(Object.assign({}, roomSelector_1.safeRoomSelector), { students: {
                    select: {
                        id: true,
                        regNo: true,
                    },
                } }),
        });
        return res.status(200).json({
            rooms
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!",
        });
    }
});
exports.getAllRooms = getAllRooms;
