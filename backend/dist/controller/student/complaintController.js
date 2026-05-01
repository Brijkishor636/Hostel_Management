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
exports.getMyComplaints = exports.createComplaint = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createComplaint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { title, message, priority } = req.body;
        if (!title || !message) {
            return res.status(400).json({ msg: "Title and message required" });
        }
        const student = yield prisma.student.findUnique({
            where: { userId },
        });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        const complaint = yield prisma.complaint.create({
            data: {
                studentId: student.id,
                title,
                message,
                priority: priority || "MEDIUM",
            },
        });
        return res.status(201).json(complaint);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createComplaint = createComplaint;
const getMyComplaints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentId = req.user.studentId;
        if (!studentId) {
            const student = yield prisma.student.findUnique({
                where: { userId: req.user.id },
            });
            if (!student) {
                return res.status(404).json({ msg: "Student not found" });
            }
            studentId = student.id;
        }
        const complaints = yield prisma.complaint.findMany({
            where: { studentId },
            orderBy: { createdAt: "desc" },
        });
        return res.json(complaints);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getMyComplaints = getMyComplaints;
