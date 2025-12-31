import {Request, Response} from "express"
import { allocateRoomsInput } from "../inputs/roomsInput"
import { PrismaClient } from "@prisma/client";

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
            where: {hostelId: hostelId, number: parsed.data.roomNumber}
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