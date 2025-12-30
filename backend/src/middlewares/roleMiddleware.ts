import { Request, Response, NextFunction } from "express"

export const authorizeRole = (...allowedRoutes: string[])=>{
    return ((req: Request, res: Response, next: NextFunction)=>{
        if(!allowedRoutes.includes(req.user.role)){
            // console.log(req.user.role);
            return res.status(403).json({
                msg: "Access denied"
            })
        }
        next();
    })
}