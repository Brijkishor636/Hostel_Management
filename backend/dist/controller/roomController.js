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
exports.allocateRoom = void 0;
const roomsInput_1 = require("../inputs/roomsInput");
const client_1 = require("@prisma/client");
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
        const student = yield prisma.user.findFirst({
            where: { id: parsed.data.studnetId }
        });
        if (!student || student.hostelId != hostelId) {
            return res.status(404).json({
                msg: "Student not found"
            });
        }
        const room = yield prisma.room.findFirst({
            where: { hostelId: hostelId, number: parsed.data.roomNumber }
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
                data: { roomId: room.id }
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
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.allocateRoom = allocateRoom;
