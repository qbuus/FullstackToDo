"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        select: true,
    },
    password: { type: String, required: true, select: false },
    expireAt: { type: Date, expires: 3600 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
