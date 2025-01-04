import GeneralTemplate from "./GeneralTemplate";
import BlogPostTemplate from "./BlogPostTemplate";
import LinkedinTemplate from "./LinkedinTemplate";
import TwitterTemplate from "./TwitterTemplate";
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
