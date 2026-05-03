import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMyRoom = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        room: true,
      },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    return res.json({
      room: student.room
        ? {
            id: student.room.id,
            number: student.room.number,
            capacity: student.room.capacity,
            occupancy: student.room.occupancy,
            status: student.room.status,
          }
        : null,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error fetching room" });
  }
};