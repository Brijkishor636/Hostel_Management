import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNotice = async (req: Request, res: Response) => {
  try {
    const { title, description, type, expiresAt } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description required" });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        description,
        type: type || "GENERAL",
        hostelId: req.user.hostelId,
        createdBy: req.user.id,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return res.status(201).json(notice);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllNotices = async (req: Request, res: Response) => {
  try {
    res.setHeader("Cache-Control", "no-store");

    const hostelId = req.user.hostelId;

    const notices = await prisma.notice.findMany({
      where: {
        hostelId,
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(notices);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, type, expiresAt } = req.body;

    const notice = await prisma.notice.findUnique({ where: { id } });

    if (!notice) {
      return res.status(404).json({ msg: "Notice not found" });
    }

    if (req.user.role !== "ADMIN" && notice.createdBy !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const updated = await prisma.notice.update({
      where: { id },
      data: {
        title,
        description,
        type,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return res.json(updated);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notice = await prisma.notice.findUnique({ where: { id } });

    if (!notice) {
      return res.status(404).json({ msg: "Notice not found" });
    }

    if (req.user.role !== "ADMIN" && notice.createdBy !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await prisma.notice.update({
      where: { id },
      data: { isActive: false },
    });

    return res.json({ msg: "Notice deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const getSingleNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  const notice = await prisma.notice.findUnique({
    where: { id },
  });
  return res.json(notice);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};