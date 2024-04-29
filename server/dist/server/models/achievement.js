"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const AchievementSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, default: "" },
    progress: { type: Number, default: 0 }
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', AchievementSchema);
//# sourceMappingURL=achievement.js.map