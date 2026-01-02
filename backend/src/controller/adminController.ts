import { Request, Response } from "express"
import { createStudentInput, updateStudentSchema } from "../inputs/studentInput";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { safeUserSelect } from "../selectors/userSelector";
import { createUserInput, updateUserInput} from "../inputs/wardenInput";

const prisma = new PrismaClient();

export const createStudent = async (req: Request, res: Response) =>{
    try{
        const parsed = createStudentInput.safeParse(req.body);
        if(!parsed.success){
            return res.status(401).json({
                msg: "Invalid inputs!!"
            })
        }
        const hostelId = req.user?.hostelId;
        const existUser = await prisma.user.findUnique({
            where: {
                email: parsed.data.email
            }
        })
        if(existUser){
            return res.status(400).json({
                msg: "User already exists!!"
            })
        }
        const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
        await prisma.user.create({
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
                password: hashedPassword,
                mobNo: parsed.data.mobNo,
                role: "STUDENT",
                hostelId: hostelId,
                student: {
                  create: {
                        regNo: parsed.data.regNo,
                    hostel: {
                      connect: { id: hostelId }
                    },
                    room: {
                        create: {
                            number: parsed.data.roomNo!,
                            hostel:{
                                connect: {id: hostelId}
                            }
                        }
                    }
                  }
                },
            }
        })
        return res.status(201).json({
            msg: "Student created successfully!!"
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const getStudents = async (req: Request, res: Response) =>{
    try{
        const hostelId = req.user?.hostelId;
        const allStudents = await prisma.user.findMany({
            where: {
                role: "STUDENT",
                hostelId: hostelId,
                isActive: true
            },
            select:{
                ...safeUserSelect,
                student: {
                    select: {
                        id: true,
                        regNo: true,
                        room: {
                            select: {
                                id: true,
                                number: true,
                            }
                        }
                    }
                },
                hostel: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return res.status(200).json(allStudents);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const getSingleStudent = async (req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const hostelId = req.user?.hostelId;
        const student = await prisma.user.findUnique({
            where: {
                id: id,
                hostelId
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
                                number: true
                            }
                        }
                    }
                },
                hostel: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return res.status(200).json(student);
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const createWarden = async (req: Request, res: Response) =>{
    try{
        const parsed = createUserInput.safeParse(req.body);
        const hostelId = req.user?.hostelId;
        if(!parsed.success){
            return res.status(401).json({
                msg: "Invalid inputs!!"
            })
        }
        const existWarden = await prisma.user.findUnique({
            where: {email : parsed.data.email}
        })
        if(existWarden){
            return res.status(400).json({
                msg: "User already exists!!"
            })
        }
        const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
        await prisma.user.create({
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
                password: hashedPassword,
                mobNo: parsed.data.mobNo,
                role: "WARDEN",
                hostelId
            }
        })
        return res.status(200).json({
            msg: "User created successfully.."
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const getwardens = async (req: Request, res: Response) =>{
    try{
        const hostelId = req.user?.hostelId;
        const allWardens = await prisma.user.findMany({
            where: {
                role: "WARDEN",
                hostelId: hostelId,
                isActive: true
            },
            select: {
                ...safeUserSelect,
                hostel: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return res.status(200).json(allWardens);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const getSingleWarden = async (req: Request, res: Response) =>{
    try{
        const hostelId = req.user?.hostelId;
        const id = req.params.id;
        const singleWarden = await prisma.user.findUnique({
            where: {
                id: id,
                hostelId: hostelId
            },
            select: {
                ...safeUserSelect,
                hostel: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return res.status(200).json(singleWarden);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const deleteStudent = async (req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const hostelId = req.user?.hostelId;
        const existUser = await prisma.user.findUnique({
            where: {
                id: id,
                hostelId,
                role: "STUDENT"
            }
        })
        if(!existUser){
            return res.status(404).json({
                msg: "Student not found"
            })
        }
        if(existUser.role === "ADMIN"){
            return res.status(400).json({
                msg: "Admin cannot be deleted"
            })
        }
        await prisma.user.update({
            where: {id: id, hostelId, role: "STUDENT"},
            data: {isActive: false}
        })
        return res.status(200).json({
            msg: "Student deleted successfully.."
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const deleteWarden = async (req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const hostelId = req.user?.hostelId;
        const existWarden = await prisma.user.findUnique({
            where: {id: id, hostelId, role: "WARDEN"}
        })
        if(!existWarden){
            return res.status(404).json({
                msg: "Warden doesn't exists!"
            })
        }
        if(existWarden.role === "ADMIN"){
            return res.status(400).json({
                msg: "Admin cannot be deleted"
            })
        }
        await prisma.user.update({
            where: {id: id, hostelId, role: "WARDEN"},
            data: {isActive: false}
        })
        return res.status(200).json({
            msg: "Warden updated successfully.."
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const hostelId = req.user?.hostelId;
    const parsed = updateStudentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        msg: "Incorrect inputs!!"
      });
    }
    const existingStudent = await prisma.user.findFirst({
      where: {
        id,
        hostelId,
        role: "STUDENT"
      }
    });

    if (!existingStudent) {
      return res.status(404).json({
        msg: "Student not found!!"
      });
    }

    await prisma.user.update({
      where: { id },
      data: {
        name: parsed.data.name,
        mobNo: parsed.data.mobNo,
        isActive: parsed.data.isActive,
        student: {
          upsert: {
            update: {
              regNo: parsed.data.regNo!
            },
            create: {
              regNo: parsed.data.regNo!,
              hostelId
            }
          }
        }
      }
    });
    return res.status(200).json({
      msg: "Student updated successfully"
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};


export const updateUser = async (req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const hostelId = req.user?.hostelId;
        const parsed = updateUserInput.safeParse(req.body);
        if(!parsed.success){
            return res.status(401).json({
                msg: "Incorrect inputs!!"
            })
        }
        const existWarden = await prisma.user.findFirst({
            where: {id: id, hostelId: hostelId}
        })
        if(!existWarden){
            return res.status(404).json({
                msg: "user doesn't exists!!"
            })
        }
        await prisma.user.update({
            where: {id: id},
            data: {
                name: parsed.data.name,
                mobNo: parsed.data.mobNo,
                isActive: parsed.data.isActive
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

export const getAdmins = async (req: Request, res: Response) =>{
    try{
        const allAdmin = await prisma.user.findMany({
            where: {role: "ADMIN"},
            select: {
                ...safeUserSelect,
                hostel:{
                    select:{
                        name: true
                    }
                }
            }
        })
        return res.status(200).json(allAdmin);
    }catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

