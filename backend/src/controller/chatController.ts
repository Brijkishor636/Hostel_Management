import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import dotenv from "dotenv";

import OpenAI from "openai";

dotenv.config();

const prisma = new PrismaClient();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const chatController = async (
  req: Request,
  res: Response
) => {

  try {

    const { message } = req.body;

    const totalStudents =
      await prisma.student.count();

    const assignedStudents =
      await prisma.student.count({
        where: {
          roomId: {
            not: null,
          },
        },
      });

    const unassignedStudents =
      await prisma.student.count({
        where: {
          roomId: null,
        },
      });

    const totalRooms =
      await prisma.room.count();

    const vacantRooms =
      await prisma.room.count({
        where: {
          status: "AVAILABLE",
        },
      });

    const fullRooms =
      await prisma.room.count({
        where: {
          status: "FULL",
        },
      });

    const totalComplaints =
      await prisma.complaint.count();

    const pendingComplaints =
      await prisma.complaint.count({
        where: {
          status: "PENDING",
        },
      });

    const resolvedComplaints =
      await prisma.complaint.count({
        where: {
          status: "RESOLVED",
        },
      });

    const highPriorityComplaints =
      await prisma.complaint.count({
        where: {
          priority: "HIGH",
        },
      });

    const totalPayments =
      await prisma.paymentTransaction.count();

    const paymentTransactions =
      await prisma.paymentTransaction.findMany();

    const totalRevenue =
      paymentTransactions.reduce(
        (acc, curr) =>
          acc + curr.amount,
        0
      );

    const notices =
      await prisma.notice.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });

    const latestNotices =
      notices.length > 0
        ? notices
            .map((n) => n.title)
            .join(", ")
        : "No notices available";

    const totalVisitors =
      await prisma.visitor.count();

    const totalInvoices =
      await prisma.invoice.count();

    const pendingInvoices =
      await prisma.invoice.count({
        where: {
          status: "PENDING",
        },
      });

    const paidInvoices =
      await prisma.invoice.count({
        where: {
          status: "PAID",
        },
      });

    const completion =
      await client.chat.completions.create({
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

    const reply =
      completion.choices[0]
        .message.content;

    // console.log(
    //   "AI RESPONSE:",
    //   reply
    // );

    return res.status(200).json({
      reply,
    });

  } catch (error) {

    console.log(
      "CHATBOT ERROR:",
      error
    );

    return res.status(500).json({
      reply:
        "AI chatbot error occurred",
    });

  }
};