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
exports.createChargeType = exports.getAllStudentsWithDues = exports.getDashboardSummary = exports.getStudentPayments = exports.payInvoice = exports.generateInvoiceForStudent = exports.generateInvoices = exports.createCharge = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostelId = req.user.hostelId;
        const { chargeTypeId, baseAmount, frequency, interval, studentId } = req.body;
        const chargeType = yield prisma.chargeType.findFirst({
            where: {
                name: chargeTypeId.toUpperCase(),
            },
        });
        if (!chargeType) {
            return res.status(400).json({ msg: "Invalid charge type" });
        }
        const charge = yield prisma.charge.create({
            data: {
                hostelId,
                chargeTypeId: chargeType.id,
                baseAmount,
                frequency,
                interval,
                startDate: new Date(),
            },
        });
        if (studentId) {
            const totalAmount = baseAmount * interval;
            yield prisma.invoice.create({
                data: {
                    studentId,
                    chargeId: charge.id,
                    totalAmount,
                    paidAmount: 0,
                    remaining: totalAmount,
                    dueDate: new Date(),
                },
            });
        }
        return res.status(201).json(charge);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createCharge = createCharge;
const generateInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostelId = req.user.hostelId;
        const { dueDate } = req.body;
        if (!dueDate) {
            return res.status(400).json({ msg: "Due date required" });
        }
        const parsedDate = new Date(dueDate);
        const students = yield prisma.student.findMany({
            where: { hostelId },
        });
        const charges = yield prisma.charge.findMany({
            where: { hostelId },
        });
        let created = 0;
        for (const student of students) {
            for (const charge of charges) {
                const totalAmount = charge.baseAmount * charge.interval;
                const exists = yield prisma.invoice.findFirst({
                    where: {
                        studentId: student.id,
                        chargeId: charge.id,
                        dueDate: parsedDate,
                    },
                });
                if (!exists) {
                    yield prisma.invoice.create({
                        data: {
                            studentId: student.id,
                            chargeId: charge.id,
                            totalAmount,
                            paidAmount: 0,
                            remaining: totalAmount,
                            dueDate: parsedDate,
                        },
                    });
                    created++;
                }
            }
        }
        return res.json({ msg: "Invoices generated", count: created });
    }
    catch (_a) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.generateInvoices = generateInvoices;
const generateInvoiceForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, chargeId } = req.body;
        const charge = yield prisma.charge.findUnique({
            where: { id: chargeId },
        });
        if (!charge) {
            return res.status(404).json({ msg: "Charge not found" });
        }
        const totalAmount = charge.baseAmount * charge.interval;
        const invoice = yield prisma.invoice.create({
            data: {
                studentId,
                chargeId,
                totalAmount,
                paidAmount: 0,
                remaining: totalAmount,
                dueDate: new Date(),
            },
        });
        return res.json(invoice);
    }
    catch (_a) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.generateInvoiceForStudent = generateInvoiceForStudent;
const payInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId, amount } = req.body;
        const invoice = yield prisma.invoice.findUnique({
            where: { id: invoiceId },
        });
        if (!invoice) {
            return res.status(404).json({ msg: "Invoice not found" });
        }
        const remaining = invoice.totalAmount - invoice.paidAmount;
        if (amount > remaining) {
            return res.status(400).json({
                msg: "Amount exceeds remaining balance",
            });
        }
        const newPaid = invoice.paidAmount + amount;
        const newRemaining = invoice.totalAmount - newPaid;
        const status = newRemaining === 0
            ? "PAID"
            : newPaid > 0
                ? "PARTIAL"
                : "PENDING";
        yield prisma.invoice.update({
            where: { id: invoiceId },
            data: {
                paidAmount: newPaid,
                remaining: newRemaining,
                status,
            },
        });
        yield prisma.paymentTransaction.create({
            data: {
                studentId: invoice.studentId,
                invoiceId,
                amount,
            },
        });
        return res.json({ msg: "Payment successful" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.payInvoice = payInvoice;
const getStudentPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        // console.log("API studentId:", studentId);
        const invoices = yield prisma.invoice.findMany({
            where: { studentId },
            include: {
                charge: {
                    include: { chargeType: true },
                },
            },
        });
        // console.log("Invoices found:", invoices.length);
        const formatted = invoices.map((inv) => ({
            id: inv.id,
            type: inv.charge.chargeType.name,
            amount: inv.totalAmount,
            paidAmount: inv.paidAmount,
            frequency: inv.charge.interval,
            status: inv.status,
        }));
        return res.json(formatted);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getStudentPayments = getStudentPayments;
const getDashboardSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostelId = req.user.hostelId;
        const invoices = yield prisma.invoice.findMany({
            where: { student: { hostelId } },
        });
        let total = 0;
        let paid = 0;
        invoices.forEach((i) => {
            total += i.totalAmount;
            paid += i.paidAmount;
        });
        return res.json({
            total,
            paid,
            remaining: total - paid,
        });
    }
    catch (_a) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getDashboardSummary = getDashboardSummary;
const getAllStudentsWithDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostelId = req.user.hostelId;
        const page = Number(req.query.page) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;
        const [students, totalCount] = yield Promise.all([
            prisma.student.findMany({
                where: { hostelId },
                include: {
                    user: true,
                    room: true,
                    invoices: true,
                },
                skip,
                take: limit,
            }),
            prisma.student.count({
                where: { hostelId },
            }),
        ]);
        const result = students.map((student) => {
            var _a;
            return ({
                studentId: student.id,
                name: student.user.name,
                room: ((_a = student.room) === null || _a === void 0 ? void 0 : _a.number) || "N/A",
                due: student.invoices.reduce((sum, inv) => sum + inv.remaining, 0),
            });
        });
        return res.json({
            data: result,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        });
    }
    catch (_a) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getAllStudentsWithDues = getAllStudentsWithDues;
const createChargeType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ msg: "Name is required" });
        }
        const exists = yield prisma.chargeType.findUnique({
            where: { name: name.toUpperCase() },
        });
        if (exists) {
            return res.status(400).json({ msg: "Charge type already exists" });
        }
        const chargeType = yield prisma.chargeType.create({
            data: {
                name: name.toUpperCase(),
                description,
            },
        });
        return res.status(201).json(chargeType);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createChargeType = createChargeType;
