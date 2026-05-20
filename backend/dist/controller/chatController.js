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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const client = new openai_1.default({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});
const chatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const totalStudents = yield prisma.student.count();
        const assignedStudents = yield prisma.student.count({
            where: {
                roomId: {
                    not: null,
                },
            },
        });
        const unassignedStudents = yield prisma.student.count({
            where: {
                roomId: null,
            },
        });
        const totalRooms = yield prisma.room.count();
        const vacantRooms = yield prisma.room.count({
            where: {
                status: "AVAILABLE",
            },
        });
        const fullRooms = yield prisma.room.count({
            where: {
                status: "FULL",
            },
        });
        const totalComplaints = yield prisma.complaint.count();
        const pendingComplaints = yield prisma.complaint.count({
            where: {
                status: "PENDING",
            },
        });
        const resolvedComplaints = yield prisma.complaint.count({
            where: {
                status: "RESOLVED",
            },
        });
        const highPriorityComplaints = yield prisma.complaint.count({
            where: {
                priority: "HIGH",
            },
        });
        const totalPayments = yield prisma.paymentTransaction.count();
        const paymentTransactions = yield prisma.paymentTransaction.findMany();
        const totalRevenue = paymentTransactions.reduce((acc, curr) => acc + curr.amount, 0);
        const notices = yield prisma.notice.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
        });
        const latestNotices = notices.length > 0
            ? notices
                .map((n) => n.title)
                .join(", ")
            : "No notices available";
        const totalVisitors = yield prisma.visitor.count();
        const totalInvoices = yield prisma.invoice.count();
        const pendingInvoices = yield prisma.invoice.count({
            where: {
                status: "PENDING",
            },
        });
        const paidInvoices = yield prisma.invoice.count({
            where: {
                status: "PAID",
            },
        });
        const completion = yield client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `
You are Hostel AI Assistant.

You are:
- friendly
- professional
- conversational
- intelligent

You answer naturally like ChatGPT.

Hostel Data:

STUDENTS:
- Total Students: ${totalStudents}
- Assigned Students: ${assignedStudents}
- Unassigned Students: ${unassignedStudents}

ROOMS:
- Total Rooms: ${totalRooms}
- Vacant Rooms: ${vacantRooms}
- Full Rooms: ${fullRooms}

COMPLAINTS:
- Total Complaints: ${totalComplaints}
- Pending Complaints: ${pendingComplaints}
- Resolved Complaints: ${resolvedComplaints}
- High Priority Complaints: ${highPriorityComplaints}

PAYMENTS:
- Total Payments: ${totalPayments}
- Total Revenue: ₹${totalRevenue}

INVOICES:
- Total Invoices: ${totalInvoices}
- Pending Invoices: ${pendingInvoices}
- Paid Invoices: ${paidInvoices}

VISITORS:
- Total Visitors: ${totalVisitors}

NOTICES:
- Latest Notices: ${latestNotices}

Instructions:
- Answer naturally.
- Keep answers short.
- Use hostel data when required.
- Answer greetings politely.
- Never generate fake information.
`,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });
        const reply = completion.choices[0]
            .message.content;
        console.log("AI RESPONSE:", reply);
        return res.status(200).json({
            reply,
        });
    }
    catch (error) {
        console.log("CHATBOT ERROR:", error);
        return res.status(500).json({
            reply: "AI chatbot error occurred",
        });
    }
});
exports.chatController = chatController;
