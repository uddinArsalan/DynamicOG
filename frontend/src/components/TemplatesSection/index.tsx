import { useTemplateStore } from "@/store/TemplatesStore";
import { useEffect } from "react";
import TemplatePreview from "../TemplatesPreview";
import { templatesDefaultData } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const TemplatesSection = () => {
  const { loading, templates, getTemplates } = useTemplateStore();
  useEffect(() => {
    getTemplates();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      {templates.map((template, index) => (
        <Card
          key={index}
          className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
        >
          <CardContent className="flex-grow p-0">
            <TemplatePreview
              imageUrl={templatesDefaultData[index].imageUrl}
              content={templatesDefaultData[index].content}
              jsxString={template.jsx}
              logoUrl={templatesDefaultData[index].logoUrl}
              title={templatesDefaultData[index].title}
            />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-2 p-4 bg-white">
            <div className="flex flex-wrap gap-1 mr-auto">
              {template.category.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 text-xs"
                >
                  {cat}
                </Badge>
              ))}
              {template.isDefault && (
                <Badge
                  variant="default"
                  className="bg-blue-500 text-white text-xs"
                >
                  Default
                </Badge>
              )}
            </div>
            <h3 className="font-medium text-sm text-gray-900 w-full mt-2">
              {template.name}
            </h3>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TemplatesSection;
