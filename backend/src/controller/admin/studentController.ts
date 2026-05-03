import { PrismaClient, RoomStatus } from "@prisma/client";
import { Request, Response } from "express";
import { safeUserSelect } from "../../selectors/userSelector";

const prisma = new PrismaClient();

export const inactiveStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const hostelId = req.user?.hostelId;

    const student = await prisma.user.findFirst({
      where: {
        id,
        hostelId,
        role: "STUDENT",
        isActive: false
      }
    });
    if (!student) {
      return res.status(404).json({
        msg: "Inactive student not found"
      });
    }

    await prisma.user.update({
      where: { id },
      data: {
        isActive: true
      }
    });

    return res.status(200).json({
      msg: "Student activated successfully"
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};


export const removeStudent = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;
    const studentId = req.params.studentId;

    const student = await prisma.student.findFirst({
      where: { id: studentId, hostelId },
    });

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    const roomId = student.roomId;

    if (!roomId) {
      return res.status(400).json({
        msg: "Student is not assigned to any room",
      });
    }

    await prisma.student.update({
      where: { id: studentId },
      data: {
        roomId: null,
      },
    });

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }

    const newOccupancy = room.occupancy - 1;

    let newStatus: RoomStatus = RoomStatus.AVAILABLE;

    if (room.status === RoomStatus.MAINTENANCE) {
      newStatus = RoomStatus.MAINTENANCE;
    } else if (newOccupancy >= room.capacity) {
      newStatus = RoomStatus.FULL;
    }

    await prisma.room.update({
      where: { id: roomId },
      data: {
        occupancy: newOccupancy,
        status: newStatus,
      },
    });

    return res.status(200).json({
      msg: "Student removed from room",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};


export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;

    const students = await prisma.user.findMany({
      where: {
        hostelId: hostelId,
        role: "STUDENT",
        isActive: true,
      },
      select: {
        ...safeUserSelect,
        student: {
          select: {
            id: true,
            regNo: true,
            room: {
              select: {
                id: true,
                number: true,
              },
            },
          },
        },
        hostel: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      students,
      total: students.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!",
    });
  }
};