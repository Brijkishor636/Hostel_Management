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
exports.generatePayments = exports.getCharges = exports.createCharge = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const { chargeTypeId, amount, frequency, interval } = req.body;
        const charge = yield prisma.charge.create({
            data: {
                hostelId,
                chargeTypeId,
                amount,
                frequency,
                interval,
                startDate: new Date()
            }
        });
        return res.status(201).json({
            msg: "Charge created successfully",
            charge
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createCharge = createCharge;
const getCharges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const charges = yield prisma.charge.findMany({
            where: { hostelId },
            include: {
                chargeType: true
            }
        });
        return res.status(200).json(charges);
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getCharges = getCharges;
const generatePayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const { dueDate } = req.body;
        if (!dueDate) {
            return res.status(400).json({
                msg: "Due date is required"
            });
        }
        const parsedDueDate = new Date(dueDate);
        const students = yield prisma.student.findMany({
            where: { hostelId }
        });
        const charges = yield prisma.charge.findMany({
            where: { hostelId }
        });
        let createdCount = 0;
        for (const student of students) {
            for (const charge of charges) {
                const exists = yield prisma.payment.findFirst({
                    where: {
                        studentId: student.id,
                        chargeId: charge.id,
                        dueDate: parsedDueDate
                    }
                });
                if (!exists) {
                    yield prisma.payment.create({
                        data: {
                            studentId: student.id,
                            chargeId: charge.id,
                            amount: charge.amount,
                            dueDate: parsedDueDate
                        }
                    });
                    createdCount++;
                }
            }
        }
        return res.status(200).json({
            msg: "Payments generated",
            count: createdCount
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.generatePayments = generatePayments;
