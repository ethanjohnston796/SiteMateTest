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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const issue_1 = __importDefault(require("../../model/issue"));
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.check)("id", "Id is required").notEmpty(),
    (0, express_validator_1.check)("title", "Title is required").notEmpty(),
    (0, express_validator_1.check)("description", "Description is required").notEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, title, description } = req.body;
    console.log(`Going to save with id - ${id}, title - ${title} and description - ${description}`);
    const issue = yield issue_1.default.findOne({ id });
    if (issue) {
        return res
            .status(400)
            .json({ errors: [{ msg: "Same issue id already exists" }] });
    }
    const newIssue = new issue_1.default({ id, title, description });
    try {
        yield newIssue.save();
        return res.status(201).json({ msg: "Saved successfully." });
    }
    catch (error) {
        return res.status(400).json({ erros: [{ msg: "Save failed." }] });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const issues = yield issue_1.default.find({});
        return res.json({ data: issues });
    }
    catch (error) {
        return res.status(400).json({ errors: [{ msg: "Can't get issues" }] });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description } = req.body;
    console.log(`Going to update issue with id - ${id}, title - ${title} and description - ${description}`);
    let issue = yield issue_1.default.findOne({ id });
    if (issue) {
        issue.title = title;
        issue.description = description;
        try {
            yield issue.save();
            return res.json({ msg: "Updated successfully." });
        }
        catch (error) {
            return res.status(400).json({ erros: [{ msg: "Can't updated issue." }] });
        }
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Going to delete with issue id - ${id}`);
    try {
        const issue = yield issue_1.default.findOne({ id });
        if (issue) {
            yield issue.deleteOne();
            return res.json({ errors: [{ msg: "Deleted successfully." }] });
        }
        return res
            .status(404)
            .json({ errors: [{ msg: "Issue not found with give id." }] });
    }
    catch (error) {
        return res
            .status(400)
            .json({ errors: [{ msg: "Can't delete the issue." }] });
    }
}));
exports.default = router;
//# sourceMappingURL=issue.js.map