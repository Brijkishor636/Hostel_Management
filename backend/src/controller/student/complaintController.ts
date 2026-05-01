import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComplaint = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, message, priority } = req.body;
    if (!title || !message) {
      return res.status(400).json({ msg: "Title and message required" });
    }

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    const complaint = await prisma.complaint.create({
      data: {
        studentId: student.id, 
        title,
        message,
        priority: priority || "MEDIUM",
      },
    });

    return res.status(201).json(complaint);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const getMyComplaints = async (req: any, res: Response) => {
  try {
    let studentId = req.user.studentId;

    if (!studentId) {
      const student = await prisma.student.findUnique({
        where: { userId: req.user.id },
      });
      if (!student) {
        return res.status(404).json({ msg: "Student not found" });
      }
      studentId = student.id;
    }

    const complaints = await prisma.complaint.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    return res.json(complaints);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};