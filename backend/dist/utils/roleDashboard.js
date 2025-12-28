"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardForRole = void 0;
const getDashboardForRole = (role) => {
    switch (role) {
        case "ADMIN":
            return "/admin/dashboard";
        case "WARDEN":
            return "/warden/dashboard";
        case "STUDENT":
            return "/student/dashboard";
        default:
            return "/";
    }
};
exports.getDashboardForRole = getDashboardForRole;
