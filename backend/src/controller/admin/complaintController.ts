import { Request, Response } from "express";
import { ComplaintStatus, ComplaintPriority, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getComplaintById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const complaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        student: {
          include: { user: true, room: true },
        },
      },
    });

    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    return res.json(complaint);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const getAllComplaints = async (req: any, res: Response) => {
  try {
    const hostelId = req.user.hostelId;
    const { status, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const complaints = await prisma.complaint.findMany({
      where: {
        student: { hostelId },
        ...(status && {
          status: status as string,
        }),
      },
      include: {
        student: {
          include: {
            user: true,
            room: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,          
      take: limitNumber, 
    });
    const total = await prisma.complaint.count({
      where: {
        student: { hostelId },
        ...(status && {
          status: status as string,
        }),
      },
    });

    return res.json({
      complaints,
      total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const updateComplaintStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(ComplaintStatus).includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const updated = await prisma.complaint.update({
      where: { id },
      data: { status },
    });

    return res.json(updated);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const updateComplaintPriority = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { priority } = req.body;

    priority = priority?.toUpperCase();

    if (!Object.values(ComplaintPriority).includes(priority)) {
      return res.status(400).json({ msg: "Invalid priority" });
    }

    const updated = await prisma.complaint.update({
      where: { id },
      data: { priority },
    });

    return res.json(updated);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};