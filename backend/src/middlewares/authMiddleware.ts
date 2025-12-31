import { NextFunction, Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    let token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            msg: "no token, authorization denied!!"
        })
    }
    try{
        const secretKey = process.env.JWT_SECRET as Secret;
        const decoded = jwt.verify(token, secretKey);
        if (typeof decoded === "object" && decoded !== null) {
            req.user = {
                id: (decoded as any).userId,
                role: (decoded as any).role,
                hostelId: (decoded as any).hostelId
            };
            // console.log(req.user);
            next();
        }
        else{
            return res.status(401).json({
                msg: "Invalid token payload"
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}