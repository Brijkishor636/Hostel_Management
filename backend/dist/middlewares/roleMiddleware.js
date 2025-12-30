"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const authorizeRole = (...allowedRoutes) => {
    return ((req, res, next) => {
        if (!allowedRoutes.includes(req.user.role)) {
            // console.log(req.user.role);
            return res.status(403).json({
                msg: "Access denied"
            });
        }
        next();
    });
};
exports.authorizeRole = authorizeRole;
