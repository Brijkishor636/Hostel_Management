import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const inactiveWarden = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const hostelId = req.user?.hostelId;

    const warden = await prisma.user.findFirst({
      where: {
        id,
        hostelId,
        role: "WARDEN",
        isActive: false
      }
    });
    if (!warden) {
      return res.status(404).json({
        msg: "Inactive warden not found"
      });
    }

    await prisma.user.update({
      where: { id },
      data: {
        isActive: true
      }
    });

    return res.status(200).json({
      msg: "Warden activated successfully"
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};