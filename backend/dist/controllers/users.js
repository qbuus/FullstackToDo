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
exports.SingOut = exports.SignIn = exports.signUp = exports.getAuthenticated = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passwordValidator_1 = require("../utils/passwordValidator");
const getAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuthenticatin = yield user_1.default
            .findById(req.session.userId)
            .select("+email")
            .exec();
        res.status(200).json(userAuthenticatin);
    }
    catch (error) {
        next(error);
    }
});
exports.getAuthenticated = getAuthenticated;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (!username || !email || !password) {
            throw (0, http_errors_1.default)(400, "please fill in");
        }
        const existingUser = yield user_1.default
            .findOne({
            username: username,
        })
            .exec();
        if (existingUser) {
            throw (0, http_errors_1.default)(401, "This username is already in use");
        }
        const existingEmail = yield user_1.default
            .findOne({ email: email })
            .exec();
        if (existingEmail) {
            throw (0, http_errors_1.default)(401, "This email is already in use");
        }
        const checkedPassword = (0, passwordValidator_1.validatePassword)(password);
        if (checkedPassword) {
            throw (0, http_errors_1.default)(401, "This password is not strong enough");
        }
        const hashedPassoword = yield bcryptjs_1.default.hash(password, 10);
        const userCreate = yield user_1.default.create({
            username: username,
            email: email,
            password: hashedPassoword,
            expireAt: new Date(),
        });
        req.session.userId = userCreate._id;
        res.json(userCreate);
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            throw (0, http_errors_1.default)(401, "invalid parameters");
        }
        const existingUser = yield user_1.default
            .findOne({ username: username })
            .select("+password +email")
            .exec();
        if (!existingUser) {
            throw (0, http_errors_1.default)(401, "invalid credentials");
        }
        const matchingPassword = bcryptjs_1.default.compare(password, existingUser.password);
        if (!matchingPassword) {
            throw (0, http_errors_1.default)(401, "invalid password");
        }
        req.session.userId = existingUser._id;
        res.status(200).json(existingUser);
    }
    catch (error) {
        next(error);
    }
});
exports.SignIn = SignIn;
const SingOut = (req, res, next) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                next(error);
            }
            res.sendStatus(200);
        });
    }
    catch (error) {
        next(error);
    }
};
exports.SingOut = SingOut;
