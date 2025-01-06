import { Templates } from "../models/templates.model.ts";
import templatesJsonData from "../data/index.ts";

export async function feedTemplatesModel() {
  await Promise.all(
    templatesJsonData.map((template) => Templates.create(template))
  );
}
