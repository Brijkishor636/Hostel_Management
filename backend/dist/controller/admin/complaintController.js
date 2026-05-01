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
exports.updateComplaintPriority = exports.updateComplaintStatus = exports.getAllComplaints = exports.getComplaintById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getComplaintById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const complaint = yield prisma.complaint.findUnique({
            where: { id },
            include: {
                student: {
                    include: { user: true, room: true },
                },
            },
        });
        if (!complaint) {
            return res.status(404).json({ msg: "Complaint not found" });
        }
        return res.json(complaint);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getComplaintById = getComplaintById;
const getAllComplaints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostelId = req.user.hostelId;
        const { status, page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const complaints = yield prisma.complaint.findMany({
            where: Object.assign({ student: { hostelId } }, (status && {
                status: status,
            })),
            include: {
                student: {
                    include: {
                        user: true,
                        room: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limitNumber,
        });
        const total = yield prisma.complaint.count({
            where: Object.assign({ student: { hostelId } }, (status && {
                status: status,
            })),
        });
        return res.json({
            complaints,
            total,
            page: pageNumber,
            limit: limitNumber,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getAllComplaints = getAllComplaints;
const updateComplaintStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!Object.values(client_1.ComplaintStatus).includes(status)) {
            return res.status(400).json({ msg: "Invalid status" });
        }
        const updated = yield prisma.complaint.update({
            where: { id },
            data: { status },
        });
        return res.json(updated);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateComplaintStatus = updateComplaintStatus;
const updateComplaintPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { priority } = req.body;
        priority = priority === null || priority === void 0 ? void 0 : priority.toUpperCase();
        if (!Object.values(client_1.ComplaintPriority).includes(priority)) {
            return res.status(400).json({ msg: "Invalid priority" });
        }
        const updated = yield prisma.complaint.update({
            where: { id },
            data: { priority },
        });
        return res.json(updated);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateComplaintPriority = updateComplaintPriority;
