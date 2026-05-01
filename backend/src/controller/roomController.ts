import {Request, Response} from "express"
import { allocateRoomsInput, createRoomsInput, updateRoomInput } from "../inputs/roomsInput"
import { PrismaClient } from "@prisma/client";
import { safeRoomSelector } from "../selectors/roomSelector";

const prisma = new PrismaClient();

export const allocateRoom = async (req: Request, res: Response) => {
  try {
    const { studentId, roomId } = req.body;

    if (!studentId || !roomId) {
      return res.status(400).json({
        msg: "StudentId and RoomId are required",
      });
    }
    const hostelId = req.user?.hostelId;
    const student = await prisma.student.findFirst({
      where: { id: studentId },
    });

    if (!student || student.hostelId !== hostelId) {
      return res.status(404).json({ msg: "Student not found" });
    }

    if (student.roomId) {
      return res.status(400).json({
        msg: "Room already allocated for this student",
      });
    }
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
        hostelId,
      },
    });

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (room.status === "MAINTENANCE") {
      return res.status(400).json({
        msg: "Room is under maintenance",
      });
    }

    if (room.occupancy >= room.capacity) {
      return res.status(400).json({
        msg: "Room is full",
      });
    }

    await prisma.$transaction([
      prisma.student.update({
        where: { id: studentId },
        data: { roomId: room.id },
      }),
      prisma.room.update({
        where: { id: room.id },
        data: {
          occupancy: { increment: 1 },
          status:
            room.occupancy + 1 >= room.capacity
              ? "FULL"
              : "AVAILABLE",
        },
      }),
    ]);

    return res.status(200).json({
      msg: "Room allocated successfully",
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!",
    });
  }
};


export const createRooms = async (req: Request, res: Response) => {
  try {
    const parsed = createRoomsInput.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        msg: "Incorrect inputs"
      });
    }

    const hostelId = req.user?.hostelId;

    const roomData = parsed.data.rooms.map((r) => ({
      number: r.roomNo,
      capacity: r.capacity, 
      hostelId,
    }));

    const result = await prisma.room.createMany({
      data: roomData,
      skipDuplicates: true,
    });

    return res.status(201).json({
      msg: "Rooms created successfully",
      count: result.count,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};


export const getRooms = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;

    const skip = (page - 1) * limit;

    const total = await prisma.room.count({
      where: { hostelId }
    });

    const rooms = await prisma.room.findMany({
      where: { hostelId },
      skip,
      take: limit,
      orderBy: {
        number: "asc"
      },
      select: {
        ...safeRoomSelector,
        students: {
          select: {
            id: true,
            regNo: true
          }
        }
      }
    });

    return res.status(200).json({
      rooms,
      total,
      page,
      limit
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!"
    });
  }
};

export const getSingleRoom = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;
    const id = req.params.id;

    const singleRoom = await prisma.room.findFirst({
      where: {
        id, 
        hostelId,
      },
      select: {
        ...safeRoomSelector,
        students: {
          select: {
            id: true,
            regNo: true,
            user: { 
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!singleRoom) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }
    return res.status(200).json({
      room: singleRoom,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!",
    });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const parsed = updateRoomInput.safeParse(req.body);
    const id = req.params.id;

    if (!parsed.success) {
      return res.status(400).json({
        msg: "Invalid inputs!!",
      });
    }

    const hostelId = req.user?.hostelId;

    const existRoom = await prisma.room.findFirst({
      where: { id, hostelId },
    });

    if (!existRoom) {
      return res.status(404).json({
        msg: "Room not found!!",
      });
    }

    const newCapacity = parsed.data.capacity;

    let newStatus = "AVAILABLE";

    if (existRoom.status === "MAINTENANCE") {
      newStatus = "MAINTENANCE";
    } else if (existRoom.occupancy >= newCapacity) {
      newStatus = "FULL";
    }
    const updatedRoom = await prisma.room.update({
      where: { id: existRoom.id },
      data: {
        capacity: newCapacity,
        status: newStatus,
      }
    });

    return res.status(200).json({
      msg: "Room updated successfully",
      room: updatedRoom
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!",
    });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;
    const id = req.params.id;

    const existRoom = await prisma.room.findFirst({
      where: { id, hostelId },
    });

    if (!existRoom) {
      return res.status(400).json({
        msg: "Room doesn't exist!!",
      });
    }
    const count = await prisma.student.count({
      where: { roomId: id },
    });

    if (count > 0) {
      return res.status(400).json({
        msg: "Room can't be deleted, student exists",
      });
    }
    await prisma.room.delete({
      where: { id },
    });
    return res.status(200).json({
      msg: "Room deleted successfully..",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!",
    });
  }
};



export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const hostelId = req.user?.hostelId;

    const rooms = await prisma.room.findMany({
      where: { hostelId },
      orderBy: {
        number: "asc",
      },
      select: {
        ...safeRoomSelector,
        students: {
          select: {
            id: true,
            regNo: true,
          },
        },
      },
    });

    return res.status(200).json({
      rooms
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!",
    });
  }
};