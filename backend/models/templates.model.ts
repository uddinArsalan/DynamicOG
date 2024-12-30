import { model, Schema } from "mongoose";
export const templatesSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index : true
    },
    name: {
      type: String,
      default: "Untitled",
      index: true,
    },
    jsx: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      enum: ["social", "marketing", "blog", "personal"],
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
