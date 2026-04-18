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
exports.payPayment = exports.getMyPayments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMyPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const student = yield prisma.student.findUnique({
            where: { userId }
        });
        const payments = yield prisma.payment.findMany({
            where: { studentId: student === null || student === void 0 ? void 0 : student.id },
            include: {
                charge: {
                    include: {
                        chargeType: true
                    }
                }
            }
        });
        return res.status(200).json(payments);
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getMyPayments = getMyPayments;
const payPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId, method } = req.body;
        const payment = yield prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: "PAID",
                paidAt: new Date(),
                paymentMethod: method
            }
        });
        return res.status(200).json({
            msg: "Payment successful",
            payment
        });
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.payPayment = payPayment;
