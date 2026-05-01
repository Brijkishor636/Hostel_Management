"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            msg: "No token, authorization denied!",
        });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof decoded === "object" && decoded !== null) {
            const userData = decoded;
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
        }
        else {
            return res.status(401).json({
                msg: "Invalid token payload",
            });
        }
    }
    catch (err) {
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
exports.verifyToken = verifyToken;
