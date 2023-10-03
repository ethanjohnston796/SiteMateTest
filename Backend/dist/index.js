"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const issue_1 = __importDefault(require("./route/api/issue"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const api_version = process.env.API_VERSION;
(0, connectDB_1.default)();
app.use((0, cors_1.default)("*"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(`/api/${api_version}/issue`, issue_1.default);
app.listen(port, () => {
    console.log(`🚀Server is listening on ${port}🚀`);
});
//# sourceMappingURL=index.js.map