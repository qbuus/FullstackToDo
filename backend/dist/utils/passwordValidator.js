"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const password_validator_1 = __importDefault(require("password-validator"));
function validatePassword(password) {
    const schema = new password_validator_1.default();
    schema
        .is()
        .min(6)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits()
        .has()
        .not()
        .spaces();
    const validationResult = schema.validate(password, {
        list: true,
    });
    if (Array.isArray(validationResult)) {
        return validationResult.join("\n");
    }
    return undefined;
}
exports.validatePassword = validatePassword;
