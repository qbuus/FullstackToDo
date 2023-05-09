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
exports.deleteToDo = exports.updateToDos = exports.createToDo = exports.getToDo = exports.getToDos = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema_1 = __importDefault(require("../models/TodoSchema"));
const isDefined_1 = require("../utils/isDefined");
const getToDos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUser = req.session.userId;
    try {
        (0, isDefined_1.assertIsDefined)(authenticatedUser);
        const ToDos = yield TodoSchema_1.default.find({
            userId: authenticatedUser,
        }).exec();
        res.status(200).json(ToDos);
    }
    catch (error) {
        next(error);
    }
});
exports.getToDos = getToDos;
const getToDo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const authenticatedUser = req.session.userId;
            (0, isDefined_1.assertIsDefined)(authenticatedUser);
            if (!mongoose_1.default.isValidObjectId(id)) {
                throw (0, http_errors_1.default)(400, "invalid ToDo id");
            }
            const ToDo = yield TodoSchema_1.default.findById({ id }).exec();
            if (!ToDo) {
                (0, http_errors_1.default)(404, "To Do Not Found");
            }
            res.status(200).json(ToDo);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.getToDo = getToDo;
const createToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const text = req.body.text;
        const authenticatedUser = req.session.userId;
        (0, isDefined_1.assertIsDefined)(authenticatedUser);
        if (!title) {
            (0, http_errors_1.default)(400, "Please fill in the fields");
        }
        const newToDo = yield TodoSchema_1.default.create({
            userId: authenticatedUser,
            title: title,
            text: text,
            expireAt: new Date(),
        });
        res.status(200).json(newToDo);
    }
    catch (error) {
        next(error);
    }
});
exports.createToDo = createToDo;
const updateToDos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newTitle = req.body.title;
        const newText = req.body.text;
        const authenticatedUser = req.session.userId;
        (0, isDefined_1.assertIsDefined)(authenticatedUser);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, "invalid ToDo id");
        }
        if (!newTitle) {
            (0, http_errors_1.default)(400, "Please fill in the title field");
        }
        const ToDo = yield TodoSchema_1.default.findById({ _id: id }).exec();
        if (!ToDo) {
            throw (0, http_errors_1.default)(404, "To Do not found");
        }
        if (!ToDo.userId.equals(authenticatedUser)) {
            throw (0, http_errors_1.default)(401, "not authorized");
        }
        ToDo.title = newTitle;
        ToDo.text = newText;
        const updated = yield ToDo.save();
        res.status(200).json(updated);
    }
    catch (error) {
        next(error);
    }
});
exports.updateToDos = updateToDos;
const deleteToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const authenticatedUser = req.session.userId;
        (0, isDefined_1.assertIsDefined)(authenticatedUser);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, "invalid todo id ");
        }
        const toDo = yield TodoSchema_1.default.findById(id).exec();
        if (!toDo) {
            throw (0, http_errors_1.default)(404, "todo not found");
        }
        if (!toDo.userId.equals(authenticatedUser)) {
            throw (0, http_errors_1.default)(401, "not authorized. No access");
        }
        yield toDo.deleteOne({ _id: id });
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteToDo = deleteToDo;
