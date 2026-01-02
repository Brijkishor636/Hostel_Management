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
exports.deleteRoom = exports.updateRoom = exports.getSingleRoom = exports.getAllRooms = exports.createRooms = exports.allocateRoom = void 0;
const roomsInput_1 = require("../inputs/roomsInput");
const client_1 = require("@prisma/client");
const roomSelector_1 = require("../selectors/roomSelector");
const prisma = new client_1.PrismaClient();
const allocateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = roomsInput_1.allocateRoomsInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(401).json({
                msg: "Incorrect inputs!!"
            });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const student = yield prisma.student.findFirst({
            where: { id: parsed.data.studnetId }
        });
        if (!student || student.hostelId != hostelId) {
            return res.status(404).json({
                msg: "Student not found"
            });
        }
        if (student.roomId) {
            return res.status(400).json({
                msg: "Room already allocated, for student"
            });
        }
        const room = yield prisma.room.findFirst({
            where: { hostelId: hostelId, number: parsed.data.roomNo }
        });
        if (!room) {
            return res.status(404).json({
                msg: "Room not found!!"
            });
        }
        if (room.occupancy >= room.capacity) {
            return res.status(400).json({ msg: "Room is full" });
        }
        yield prisma.$transaction([
            prisma.student.update({
                where: { id: parsed.data.studnetId },
                data: {
                    roomId: room.id
                }
            }),
            prisma.room.update({
                where: { id: room.id },
                data: {
                    occupancy: { increment: 1 },
                    status: room.occupancy + 1 >= room.capacity
                        ? "FULL" : "AVAILABLE"
                }
            })
        ]);
        return res.status(200).json({
            msg: "Room allocated successfully..."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.allocateRoom = allocateRoom;
const createRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = roomsInput_1.createRoomsInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ msg: "Incorrect inputs" });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const roomData = parsed.data.rooms.map(r => ({
            number: r.roomNo,
            hostelId
        }));
        yield prisma.room.createMany({
            data: roomData,
            skipDuplicates: true
        });
        return res.status(201).json({
            msg: "Rooms created successfully"
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createRooms = createRooms;
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const allRooms = yield prisma.room.findMany({
            where: { hostelId },
            select: Object.assign(Object.assign({}, roomSelector_1.safeRoomSelector), { students: {
                    select: {
                        id: true,
                        regNo: true
                    }
                } })
        });
        return res.status(200).json(allRooms);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getAllRooms = getAllRooms;
const getSingleRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const roomNo = req.params.roomNo;
        const singleRoom = yield prisma.room.findFirst({
            where: {
                hostelId,
                number: roomNo
            },
            select: Object.assign(Object.assign({}, roomSelector_1.safeRoomSelector), { students: {
                    select: {
                        id: true,
                        regNo: true,
                    }
                } })
        });
        return res.status(200).json(singleRoom);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getSingleRoom = getSingleRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = roomsInput_1.updateRoomInput.safeParse(req.body);
        const roomNum = req.params.roomNum;
        if (!parsed.success) {
            return res.status(401).json({
                msg: "Invalid inputs!!"
            });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const existRoom = yield prisma.room.findFirst({
            where: { number: roomNum, hostelId }
        });
        if (!existRoom) {
            return res.status(404).json({
                msg: "Room not found!!"
            });
        }
        yield prisma.room.update({
            where: {
                id: existRoom.id,
                hostelId
            },
            data: {
                number: parsed.data.roomNo,
                capacity: parsed.data.capacity
            }
        });
        return res.status(200).json({
            msg: "Room updated successfully"
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const roomNo = req.params.roomNo;
        const existRoom = yield prisma.room.findFirst({
            where: { number: roomNo, hostelId }
        });
        if (!existRoom) {
            return res.status(400).json({
                msg: "Room doesn't exists!!"
            });
        }
        if ((existRoom === null || existRoom === void 0 ? void 0 : existRoom.occupancy) != 0) {
            return res.status(400).json({
                msg: "Room can't be deleted, student exists"
            });
        }
        yield prisma.room.delete({
            where: { id: existRoom.id }
        });
        return res.status(200).json({
            msg: "Room deleted successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.deleteRoom = deleteRoom;
