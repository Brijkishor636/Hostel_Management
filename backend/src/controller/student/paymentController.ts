import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getMyPayments = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const invoices = await prisma.invoice.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: "desc" },
      include: {
        payments: true,
      },
    });

    return res.json(invoices);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error fetching payments" });
  }
};



export const getMyTransactions = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const total = await prisma.paymentTransaction.count({
      where: { studentId: student.id },
    });

    const transactions = await prisma.paymentTransaction.findMany({
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
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error fetching transactions" });
  }
};



export const getMyDues = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const dues = await prisma.invoice.findMany({
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

    const totalDue = dues.reduce(
      (sum, d) => sum + (d.remaining || 0),
      0
    );

    return res.json({
      totalDue,
      dues,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error fetching dues" });
  }
};


export const getStudentDashboard = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const [invoices, transactions] = await Promise.all([
      prisma.invoice.findMany({
        where: { studentId: student.id },
      }),
      prisma.paymentTransaction.findMany({
        where: { studentId: student.id },
      }),
    ]);

    const totalPaid = transactions.reduce(
      (sum, t) => sum + (t.amount || 0),
      0
    );

    const totalDue = invoices.reduce(
      (sum, i) => sum + (i.remaining || 0),
      0
    );

    return res.json({
      totalPaid,
      totalDue,
      totalInvoices: invoices.length,
      totalTransactions: transactions.length,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error fetching dashboard" });
  }
};