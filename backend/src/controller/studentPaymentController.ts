import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getMyPayments = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const student = await prisma.student.findUnique({
      where: { userId }
    });

    const payments = await prisma.payment.findMany({
      where: { studentId: student?.id },
      include: {
        charge: {
          include: {
            chargeType: true
          }
        }
      }
    });

    return res.status(200).json(payments);

  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const payPayment = async (req: Request, res: Response) => {
  try {
    const { paymentId, method } = req.body;

    const payment = await prisma.payment.update({
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

  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};