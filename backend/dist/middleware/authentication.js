"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredAuthentication = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const requiredAuthentication = (req, res, next) => {
    if (req.session.userId) {
        next();
    }
    else {
        next((0, http_errors_1.default)(4001, "User is not authenticated"));
    }
};
exports.requiredAuthentication = requiredAuthentication;
