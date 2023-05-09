"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ToDoSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: false },
    expireAt: { type: Date, expires: 3600 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("ToDo", ToDoSchema);
