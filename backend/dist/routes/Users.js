"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users = __importStar(require("../controllers/users"));
const authentication_1 = require("../middleware/authentication");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createAccountLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 2,
    message: "Too many account creation requests. It is limited to 2 request per 1 minutes",
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429,
});
const router = express_1.default.Router();
router.post("/users/signup", createAccountLimiter, users.signUp);
router.post("/users/signin", createAccountLimiter, users.SignIn);
router.get("/users/", authentication_1.requiredAuthentication, users.getAuthenticated);
router.post("/users/signout", users.SingOut);
exports.default = router;
