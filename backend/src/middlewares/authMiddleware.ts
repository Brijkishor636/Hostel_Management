import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied!",
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET as Secret;
    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === "object" && decoded !== null) {
      const userData = decoded as any;

      if (!userData.isActive) {
        return res.status(403).json({
          msg: "User is inactive. Access denied.",
        });
      }

      req.user = {
        id: userData.userId,
        role: userData.role,
        hostelId: userData.hostelId,
        isActive: userData.isActive,
      };

      next();
    } else {
      return res.status(401).json({
        msg: "Invalid token payload",
      });
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res.status(401).json({
        msg: "Token expired. Please login again.",
      });
    }

    return res.status(500).json({
      msg: "Internal server error!",
    });
  }
};