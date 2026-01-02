"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomInput = exports.createRoomsInput = exports.allocateRoomsInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.allocateRoomsInput = zod_1.default.object({
    studnetId: zod_1.default.string(),
    roomNo: zod_1.default.string().min(3)
});
exports.createRoomsInput = zod_1.default.object({
    rooms: zod_1.default.array(zod_1.default.object({
        roomNo: zod_1.default.string().min(3)
    })).min(1)
});
exports.updateRoomInput = zod_1.default.object({
    roomNo: zod_1.default.string().optional(),
    capacity: zod_1.default.number().int().positive().optional()
});
