import express, { Router, Request, Response } from "express";
import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";

import Issue from "../../model/issue";

const router: Router = express.Router();

router.post(
  "/",
  [
    check("id", "Id is required").notEmpty(),
    check("title", "Title is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, description } = req.body;

    console.log(
      `Going to save with id - ${id}, title - ${title} and description - ${description}`
    );
    const issue = await Issue.findOne({ id });

    if (issue) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Same issue id already exists" }] });
    }

    const newIssue = new Issue({ id, title, description });

    try {
      await newIssue.save();
      return res.status(201).json({ msg: "Saved successfully." });
    } catch (error) {
      return res.status(400).json({ erros: [{ msg: "Save failed." }] });
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const issues = await Issue.find({ id: req.params.id });
    return res.json({ data: issues });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Can't get issues" }] });
  }
});

router.put("/", async (req: Request, res: Response) => {
  const { id, title, description } = req.body;

  console.log(
    `Going to update issue with id - ${id}, title - ${title} and description - ${description}`
  );
  let issue = await Issue.findOne({ id });

  if (issue) {
    issue.title = title;
    issue.description = description;

    try {
      await issue.save();
      return res.json({ msg: "Updated successfully." });
    } catch (error) {
      return res.status(400).json({ erros: [{ msg: "Can't updated issue." }] });
    }
  }
  return res.status(404).json({ erros: [{ msg: "Issue not found." }] });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`Going to delete with issue id - ${id}`);
  try {
    const issue = await Issue.findOne({ id });
    if (issue) {
      await issue.deleteOne();
      return res.json({ errors: [{ msg: "Deleted successfully." }] });
    }
    return res
      .status(404)
      .json({ errors: [{ msg: "Issue not found with give id." }] });
  } catch (error) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Can't delete the issue." }] });
  }
});

export default router;
