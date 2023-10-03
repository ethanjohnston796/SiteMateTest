"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IssueSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const Issue = (0, mongoose_1.model)("Issue", IssueSchema);
exports.default = Issue;
//# sourceMappingURL=issue.js.map