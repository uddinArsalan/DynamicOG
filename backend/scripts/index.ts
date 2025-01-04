import { Templates } from "../models/templates.model.js";
import templatesJsonData from "../data/index.js";

export async function feedTemplatesModel() {
  await Promise.all(
    templatesJsonData.map((template) => Templates.create(template))
  );
}
