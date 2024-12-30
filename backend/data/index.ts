import GeneralTemplate from "./GeneralTemplate.js";
import BlogPostTemplate from "./BlogPostTemplate.js";
import LinkedinTemplate from "./LinkedinTemplate.js";
import TwitterTemplate from "./TwitterTemplate.js";
const templatesJsonData = [
  {
    name: "GeneralTemplate",
    jsx: GeneralTemplate,
    category: ["personal"],
    isDefault: true,
  },
  {
    name: "TwitterTemplate",
    jsx: TwitterTemplate,
    category: ["personal", "social"],
    isDefault: true,
  },
  {
    name: "BlogPostTemplate",
    jsx: BlogPostTemplate,
    category: ["blog"],
    isDefault: true,
  },
  {
    name: "LinkedinTemplate",
    jsx: LinkedinTemplate,
    category: ["social"],
    isDefault: true,
  },
];

export default templatesJsonData;
