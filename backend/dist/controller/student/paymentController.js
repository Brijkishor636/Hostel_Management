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
exports.getStudentDashboard = exports.getMyDues = exports.getMyTransactions = exports.getMyPayments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMyPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const student = yield prisma.student.findUnique({
            where: { userId },
        });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        const invoices = yield prisma.invoice.findMany({
            where: { studentId: student.id },
            orderBy: { createdAt: "desc" },
            include: {
                payments: true,
            },
        });
        return res.json(invoices);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error fetching payments" });
    }
});
exports.getMyPayments = getMyPayments;
const getMyTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const student = yield prisma.student.findUnique({
            where: { userId },
        });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        const total = yield prisma.paymentTransaction.count({
            where: { studentId: student.id },
        });
        const transactions = yield prisma.paymentTransaction.findMany({
            where: { studentId: student.id },
            orderBy: { paidAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                amount: true,
                paidAt: true,
                invoiceId: true,
            },
        });
        return res.json({
            total,
            page,
            limit,
            transactions,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error fetching transactions" });
    }
});
exports.getMyTransactions = getMyTransactions;
const getMyDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const student = yield prisma.student.findUnique({
            where: { userId },
        });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        const dues = yield prisma.invoice.findMany({
            where: {
                studentId: student.id,
                status: {
                    in: ["PENDING", "PARTIAL"],
                },
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                totalAmount: true,
                paidAmount: true,
                remaining: true,
                dueDate: true,
                status: true,
            },
        });
        const totalDue = dues.reduce((sum, d) => sum + (d.remaining || 0), 0);
        return res.json({
            totalDue,
            dues,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error fetching dues" });
    }
});
exports.getMyDues = getMyDues;
const getStudentDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const student = yield prisma.student.findUnique({
            where: { userId },
        });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        const [invoices, transactions] = yield Promise.all([
            prisma.invoice.findMany({
                where: { studentId: student.id },
            }),
            prisma.paymentTransaction.findMany({
                where: { studentId: student.id },
            }),
        ]);
        const totalPaid = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
        const totalDue = invoices.reduce((sum, i) => sum + (i.remaining || 0), 0);
        return res.json({
            totalPaid,
            totalDue,
            totalInvoices: invoices.length,
            totalTransactions: transactions.length,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Error fetching dashboard" });
    }
});
exports.getStudentDashboard = getStudentDashboard;
