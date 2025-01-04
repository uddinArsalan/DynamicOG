import { Templates } from "../models/templates.model";
import templatesJsonData from "../data/index";
export async function feedTemplatesModel() {
  await Promise.all(
    templatesJsonData.map((template) => Templates.create(template))
  );
}
