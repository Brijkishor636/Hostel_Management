"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.logout = exports.signin = void 0;
const input_1 = require("../input");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roleDashboard_1 = require("../utils/roleDashboard");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = input_1.signinInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input data"
            });
        }
        const user = yield prisma.user.findUnique({
            where: { email: parsed.data.email }
        });
        if (!user || !(yield bcryptjs_1.default.compare(parsed.data.password, user.password))) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ msg: "JWT secret not configured" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role, hostelId: user.hostelId }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
        return res.status(200).json({
            msg: "Login successful",
            role: user.role,
            dashboard: (0, roleDashboard_1.getDashboardForRole)(user.role)
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.signin = signin;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });
    return res.status(200).json({
        msg: "Logged out successfully"
    });
};
exports.logout = logout;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            res.status(400).json({
                msg: "Old and new password required!!"
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: "user not found!!"
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                msg: "oldPassword is incorrect!!"
            });
        }
        const hashPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield prisma.user.update({
            where: {
                id: userId
            }, data: {
                password: hashPassword
            }
        });
        return res.status(200).json({
            msg: "Password updated successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.changePassword = changePassword;
