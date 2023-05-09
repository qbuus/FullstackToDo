"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGO: (0, validators_1.str)(),
    PORT: (0, validators_1.port)(),
    SESSION_SECRET: (0, validators_1.str)(),
});
