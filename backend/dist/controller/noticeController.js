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
exports.getSingleNotice = exports.deleteNotice = exports.updateNotice = exports.getAllNotices = exports.createNotice = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, type, expiresAt } = req.body;
        if (!title || !description) {
            return res.status(400).json({ msg: "Title and description required" });
        }
        const notice = yield prisma.notice.create({
            data: {
                title,
                description,
                type: type || "GENERAL",
                hostelId: req.user.hostelId,
                createdBy: req.user.id,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
            },
        });
        return res.status(201).json(notice);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createNotice = createNotice;
const getAllNotices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.setHeader("Cache-Control", "no-store");
        const hostelId = req.user.hostelId;
        const notices = yield prisma.notice.findMany({
            where: {
                hostelId,
                isActive: true,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gte: new Date() } },
                ],
            },
            orderBy: { createdAt: "desc" },
        });
        return res.json(notices);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getAllNotices = getAllNotices;
const updateNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, type, expiresAt } = req.body;
        const notice = yield prisma.notice.findUnique({ where: { id } });
        if (!notice) {
            return res.status(404).json({ msg: "Notice not found" });
        }
        if (req.user.role !== "ADMIN" && notice.createdBy !== req.user.id) {
            return res.status(403).json({ msg: "Not allowed" });
        }
        const updated = yield prisma.notice.update({
            where: { id },
            data: {
                title,
                description,
                type,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
            },
        });
        return res.json(updated);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateNotice = updateNotice;
const deleteNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notice = yield prisma.notice.findUnique({ where: { id } });
        if (!notice) {
            return res.status(404).json({ msg: "Notice not found" });
        }
        if (req.user.role !== "ADMIN" && notice.createdBy !== req.user.id) {
            return res.status(403).json({ msg: "Not allowed" });
        }
        yield prisma.notice.update({
            where: { id },
            data: { isActive: false },
        });
        return res.json({ msg: "Notice deleted" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.deleteNotice = deleteNotice;
const getSingleNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notice = yield prisma.notice.findUnique({
            where: { id },
        });
        return res.json(notice);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getSingleNotice = getSingleNotice;
