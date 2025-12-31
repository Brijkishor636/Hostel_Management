"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allocateRoomsInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.allocateRoomsInput = zod_1.default.object({
    studnetId: zod_1.default.string().uuid(),
    roomNumber: zod_1.default.string().min(3)
});
