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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importStar(require("http-errors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const ToDo_1 = __importDefault(require("./routes/ToDo"));
const Users_1 = __importDefault(require("./routes/Users"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = validateEnv_1.default.PORT || 8020;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: validateEnv_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        // 1 hour //
    },
    rolling: true,
    store: connect_mongo_1.default.create({ mongoUrl: validateEnv_1.default.MONGO }),
}));
app.use("/api", ToDo_1.default);
app.use("/api", Users_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Endpoint not found"));
});
app.use((error, req, res, next) => {
    console.log(error);
    let errorMessage = "An error occured";
    let status = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        status = error.status;
        errorMessage = error.message;
    }
    res.status(status).json({ error: errorMessage });
});
mongoose_1.default
    .connect(validateEnv_1.default.MONGO)
    .then(() => {
    if (!PORT) {
        return;
    }
    else {
        app.listen(PORT, () => {
            console.log(`server is running`);
        });
    }
})
    .catch(console.error);
module.exports = app;
