import mongoose, { Schema, model } from "mongoose";

const IssueSchema: Schema = new Schema({
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

const Issue = model("Issue", IssueSchema);

export default Issue;
