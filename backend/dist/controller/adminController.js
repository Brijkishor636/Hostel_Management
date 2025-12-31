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
exports.getAdmins = exports.updateUser = exports.updateStudent = exports.deleteWarden = exports.deleteStudent = exports.getSingleWarden = exports.getwardens = exports.createWarden = exports.getSingleStudent = exports.getStudents = exports.createStudent = void 0;
const studentInput_1 = require("../inputs/studentInput");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSelector_1 = require("../selectors/userSelector");
const wardenInput_1 = require("../inputs/wardenInput");
const prisma = new client_1.PrismaClient();
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = studentInput_1.createStudentInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(401).json({
                msg: "Invalid inputs!!"
            });
        }
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const existUser = yield prisma.user.findUnique({
            where: {
                email: parsed.data.email
            }
        });
        if (existUser) {
            return res.status(400).json({
                msg: "User already exists!!"
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(parsed.data.password, 10);
        yield prisma.user.create({
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
                        }
                    }
                }
            }
        });
        return res.status(201).json({
            msg: "Student created successfully!!"
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.createStudent = createStudent;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const allStudents = yield prisma.user.findMany({
            where: {
                role: "STUDENT",
                hostelId: hostelId,
                isActive: true
            }, select: Object.assign(Object.assign({}, userSelector_1.safeUserSelect), { student: true, hostel: {
                    select: {
                        name: true
                    }
                } })
        });
        return res.status(200).json(allStudents);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getStudents = getStudents;
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const student = yield prisma.user.findUnique({
            where: {
                id: id,
                hostelId
            }, select: Object.assign(Object.assign({}, userSelector_1.safeUserSelect), { student: true, hostel: {
                    select: {
                        name: true
                    }
                } })
        });
        return res.status(200).json(student);
    }
    catch (e) {
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getSingleStudent = getSingleStudent;
const createWarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = wardenInput_1.createUserInput.safeParse(req.body);
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        if (!parsed.success) {
            return res.status(401).json({
                msg: "Invalid inputs!!"
            });
        }
        const existWarden = yield prisma.user.findUnique({
            where: { email: parsed.data.email }
        });
        if (existWarden) {
            return res.status(400).json({
                msg: "User already exists!!"
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(parsed.data.password, 10);
        yield prisma.user.create({
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
                password: hashedPassword,
                mobNo: parsed.data.mobNo,
                role: "WARDEN",
                hostelId
            }
        });
        return res.status(200).json({
            msg: "User created successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.createWarden = createWarden;
const getwardens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const allWardens = yield prisma.user.findMany({
            where: {
                role: "WARDEN",
                hostelId: hostelId,
                isActive: true
            },
            select: Object.assign(Object.assign({}, userSelector_1.safeUserSelect), { hostel: {
                    select: {
                        name: true
                    }
                } })
        });
        return res.status(200).json(allWardens);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getwardens = getwardens;
const getSingleWarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const id = req.params.id;
        const singleWarden = yield prisma.user.findUnique({
            where: {
                id: id,
                hostelId: hostelId
            },
            select: Object.assign(Object.assign({}, userSelector_1.safeUserSelect), { hostel: {
                    select: {
                        name: true
                    }
                } })
        });
        return res.status(200).json(singleWarden);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getSingleWarden = getSingleWarden;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const existUser = yield prisma.user.findUnique({
            where: {
                id: id,
                hostelId,
                role: "STUDENT"
            }
        });
        if (!existUser) {
            return res.status(404).json({
                msg: "Student not found"
            });
        }
        if (existUser.role === "ADMIN") {
            return res.status(400).json({
                msg: "Admin cannot be deleted"
            });
        }
        yield prisma.user.update({
            where: { id: id, hostelId, role: "STUDENT" },
            data: { isActive: false }
        });
        return res.status(200).json({
            msg: "Student deleted successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.deleteStudent = deleteStudent;
const deleteWarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const existWarden = yield prisma.user.findUnique({
            where: { id: id, hostelId, role: "WARDEN" }
        });
        if (!existWarden) {
            return res.status(404).json({
                msg: "Warden doesn't exists!"
            });
        }
        if (existWarden.role === "ADMIN") {
            return res.status(400).json({
                msg: "Admin cannot be deleted"
            });
        }
        yield prisma.user.update({
            where: { id: id, hostelId, role: "WARDEN" },
            data: { isActive: false }
        });
        return res.status(200).json({
            msg: "Warden updated successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.deleteWarden = deleteWarden;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const parsed = studentInput_1.updateStudentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(401).json({
                msg: "Incorrect inputs!!"
            });
        }
        const existStudent = yield prisma.user.findUnique({
            where: {
                id: id,
                hostelId,
                role: "STUDENT"
            }
        });
        if (!existStudent) {
            return res.status(404).json({
                msg: "Student not found!!"
            });
        }
        yield prisma.user.update({
            where: { id: id },
            data: {
                name: parsed.data.name,
                mobNo: parsed.data.mobNo,
                isActive: parsed.data.isActive,
                student: {
                    update: {
                        regNo: parsed.data.regNo
                    }
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.updateStudent = updateStudent;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const hostelId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.hostelId;
        const parsed = wardenInput_1.updateUserInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(401).json({
                msg: "Incorrect inputs!!"
            });
        }
        const existWarden = yield prisma.user.findFirst({
            where: { id: id, hostelId: hostelId }
        });
        if (!existWarden) {
            return res.status(404).json({
                msg: "user doesn't exists!!"
            });
        }
        yield prisma.user.update({
            where: { id: id },
            data: {
                name: parsed.data.name,
                mobNo: parsed.data.mobNo,
                isActive: parsed.data.isActive
            }
        });
        return res.status(200).json({
            msg: "User updated successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.updateUser = updateUser;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAdmin = yield prisma.user.findMany({
            where: { role: "ADMIN" },
            select: Object.assign(Object.assign({}, userSelector_1.safeUserSelect), { hostel: {
                    select: {
                        name: true
                    }
                } })
        });
        return res.status(200).json(allAdmin);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getAdmins = getAdmins;
