import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCharge = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;

    const { chargeTypeId, amount, frequency, interval } = req.body;

    const charge = await prisma.charge.create({
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

  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const getCharges = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;

    const charges = await prisma.charge.findMany({
      where: { hostelId },
      include: {
        chargeType: true
      }
    });

    return res.status(200).json(charges);

  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const generatePayments = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;

    const { dueDate } = req.body;

    if (!dueDate) {
      return res.status(400).json({
        msg: "Due date is required"
      });
    }

    const parsedDueDate = new Date(dueDate);

    const students = await prisma.student.findMany({
      where: { hostelId }
    });

    const charges = await prisma.charge.findMany({
      where: { hostelId }
    });

    let createdCount = 0;

    for (const student of students) {
      for (const charge of charges) {

        const exists = await prisma.payment.findFirst({
          where: {
            studentId: student.id,
            chargeId: charge.id,
            dueDate: parsedDueDate  
          }
        });

        if (!exists) {
          await prisma.payment.create({
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

  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};