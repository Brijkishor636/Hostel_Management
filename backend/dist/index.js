"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const warden_1 = __importDefault(require("./routes/warden"));
const student_1 = __importDefault(require("./routes/student"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/warden", warden_1.default);
app.use("/api/v1/student", student_1.default);
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
exports.default = app;
