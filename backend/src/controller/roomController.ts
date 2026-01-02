import {Request, Response} from "express"
import { allocateRoomsInput, createRoomsInput, updateRoomInput } from "../inputs/roomsInput"
import { PrismaClient } from "@prisma/client";
import { safeRoomSelector } from "../selectors/roomSelector";

const prisma = new PrismaClient();

export const allocateRoom = async (req: Request, res: Response) =>{
    try{
        const parsed = allocateRoomsInput.safeParse(req.body);
        if(!parsed.success){
            return res.status(401).json({
                msg: "Incorrect inputs!!"
            })
        }
        const hostelId = req.user?.hostelId;
        const student = await prisma.user.findFirst({
            where: { id: parsed.data.studnetId }
        })
        if(!student || student.hostelId != hostelId){
            return res.status(404).json({
                msg: "Student not found"
            })
        }
        const room = await prisma.room.findFirst({
            where: {hostelId: hostelId, number: parsed.data.roomNo}
        })
        if(!room){
            return res.status(404).json({
                msg: "Room not found!!"
            })
        }
        if (room.occupancy >= room.capacity) {
            return res.status(400).json({ msg: "Room is full" });
        }
        await prisma.$transaction([
          prisma.student.update({
            where: { id: parsed.data.studnetId},
            data: { roomId: room.id }
          }),
          prisma.room.update({
            where: { id: room.id },
            data: {
              occupancy: { increment: 1 },
              status: 
                room.occupancy + 1 >= room.capacity
                    ? "FULL" : "AVAILABLE"
            }
          })
        ]);
    return res.status(200).json({
        msg: "Room allocated successfully..."
    })
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const createRooms = async (req: Request, res: Response) => {
  try {
    const parsed = createRoomsInput.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ msg: "Incorrect inputs" });
    }
    const hostelId = req.user?.hostelId;
    const roomData = parsed.data.rooms.map(r => ({
      number: r.roomNo,
      hostelId
    }));

    await prisma.room.createMany({
      data: roomData,
      skipDuplicates: true 
    });
    return res.status(201).json({
      msg: "Rooms created successfully"
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const getAllRooms = async (req: Request, res: Response) =>{
    try{
        const hostelId = req.user?.hostelId;
        const allRooms = await prisma.room.findMany({
            where: {hostelId},
            select: {
                ...safeRoomSelector,
                students: {
                    select: {
                        regNo: true
                    }
                }
            }
        })
        return res.status(200).json(allRooms)
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const getSingleRoom = async (req: Request, res: Response) =>{
    try{
        const hostelId = req.user?.hostelId;
        const roomNo = req.params.roomNo;
        const singleRoom = await prisma.room.findFirst({
            where: {
                hostelId,
                number: roomNo
            },
            select: {
                ...safeRoomSelector,
                students: {
                    select: {
                        regNo: true,
                    }
                }
            }
        })
        return res.status(200).json(singleRoom);
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const updateRoom = async (req: Request, res: Response) =>{
    try{
        const parsed = updateRoomInput.safeParse(req.body);
        const roomNum = req.params.roomNum;
        if(!parsed.success){
            return res.status(401).json({
                msg: "Invalid inputs!!"
            })
        }
        const hostelId = req.user?.hostelId;
        const existRoom = await prisma.room.findFirst({
            where: {number: roomNum, hostelId}
        })
        if(!existRoom){
            return res.status(404).json({
                msg: "Room not found!!"
            })
        }
        await prisma.room.update({
            where: {
                hostelId_number: {
                    hostelId,
                    number: roomNum
                }
            },
            data: parsed.data
        });
        return res.status(200).json({
            msg: "Room updated successfully"
        });
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const deleteRoom = async (req: Request, res: Response) =>{
    try{
        const hostelId = req.user?.hostelId;
        const roomNo = req.params.roomNo;
        const existStudent = await prisma.room.findFirst({
            where: {number: roomNo, hostelId}
        })
        if(existStudent?.occupancy != 0){
            return res.status(400).json({
                msg: "Room can't be deleted, student exists"
            })
        }
        await prisma.room.delete({
            where: {id: existStudent.id}
        })
        return res.status(200).json({
            msg: "Room deleted successfully.."
        })
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}