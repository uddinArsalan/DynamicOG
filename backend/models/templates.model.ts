import { model, Schema } from "mongoose";
export const templatesSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      default: "Untitled",
    },
    jsx: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["social", "marketing", "og", "blog", "personal"],
      required: true,
    },
    isDefault: {
      index: true,
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Templates = model("Templates", templatesSchema);
