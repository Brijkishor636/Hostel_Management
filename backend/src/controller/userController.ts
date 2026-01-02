import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import { getDashboardForRole } from "../utils/roleDashboard";
import bcrypt from "bcryptjs";
import { signinInput } from "../inputs/authInput";
import { safeUserSelect } from "../selectors/userSelector";
import { updateSelfDetail } from "../inputs/selfInput";

const prisma = new PrismaClient();

export const signin = async (req: Request, res: Response) => {
  try {
    const parsed = signinInput.safeParse(req.body);
    // console.log(parsed.data);
    if (!parsed.success) {
      return res.status(400).json({
        msg: "Invalid input data" 
    });
    }

    const user = await prisma.user.findFirst({
      where: { email: parsed.data.email }
    });

    if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
      return res.status(401).json({
        msg: "Invalid email or password" 
    });
    }
    const secretKey = process.env.JWT_SECRET as Secret;
    if (!secretKey) {
      return res.status(500).json({ msg: "JWT secret not configured" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, hostelId: user.hostelId },
      secretKey,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      msg: "Login successful",
      role: user.role,
      dashboard: getDashboardForRole(user.role)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const logout = (req: Request, res: Response) =>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

  return res.status(200).json({
    msg: "Logged out successfully"
  });
}


export const changePassword = async (req: Request, res: Response) =>{
    try{
        const userId = req.user?.userId;
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword){
            res.status(400).json({
                msg: "Old and new password required!!"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user){
            return res.status(404).json({
                msg: "user not found!!"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(401).json({
                msg: "oldPassword is incorrect!!"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: {
                id: userId
            },data:{
                password: hashedPassword
            }
        })
        return res.status(200).json({
            msg: "Password updated successfully.."
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const getSelfDetails = async (req: Request, res: Response) =>{
  try{
    const userId = req.user?.id;
    const selfDetail = await prisma.user.findFirst({
      where: {id : userId},
      select: {
        ...safeUserSelect,
        hostel: {
          select: {
            name: true
          }
        },
        student: {
          select: {
            regNo: true
          }
        }
      }
    })
    return res.status(200).json(selfDetail);
  }
  catch(e){
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!"
    })
  }
}

export const updateSelfProfile = async (req: Request, res: Response) =>{
  try{
    const id = req.user?.id;
    const parsed = updateSelfDetail.safeParse(req.body);
    if(!parsed.success){
      return res.status(401).json({
        msg: "Incorrect inputs!!"
      })
    }
    await prisma.user.update({
      where: {
        id: id
      },data:{
        name: parsed.data.name,
        mobNo: parsed.data.mobNo,
        student: {
          update: {
            regNo: parsed.data.regNo
          }
        }
      }
    })
    return res.status(200).json({
      msg: "User updated successfully.."
    })
  }
  catch(e){
    console.log(e);
    return res.status(500).json({
      msg: "Internal server error!!"
    })
  }
}


