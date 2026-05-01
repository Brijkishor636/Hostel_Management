import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    const payments = await prisma.payment.findMany({
      where: { userId }
    });

    const complaints = await prisma.complaint.count({
      where: {
        userId,
        status: "OPEN"
      }
    });

    const pending = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        status: "PENDING"
      }
    });

    res.json({
      roomNumber: user?.roomNumber,
      rent: user?.rent,
      pendingDues: pending._sum.amount || 0,
      complaints,
      paymentHistory: payments
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Server error" });
  }
};