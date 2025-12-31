"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            msg: "no token, authorization denied!!"
        });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof decoded === "object" && decoded !== null) {
            req.user = {
                id: decoded.userId,
                role: decoded.role,
                hostelId: decoded.hostelId
            };
            // console.log(req.user);
            next();
        }
        else {
            return res.status(401).json({
                msg: "Invalid token payload"
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
};
exports.verifyToken = verifyToken;
