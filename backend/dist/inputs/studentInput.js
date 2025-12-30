"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.createStudentInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createStudentInput = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    mobNo: zod_1.default.string(),
    regNo: zod_1.default.string()
});
exports.updateStudentSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    mobNo: zod_1.default.string().optional(),
    regNo: zod_1.default.string(),
    isActive: zod_1.default.boolean().optional()
});
