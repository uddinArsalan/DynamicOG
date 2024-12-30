import { useState, useEffect } from "react";
import OGImageForm from "../../components/OGImageForm";
import TemplatePreview from "../../components/TemplatesPreview";
import { templatesDefaultData } from "@/data";
import { Template } from "@/types";
import { useTemplateStore } from "@/store/TemplatesStore";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const OGImageGenerator = () => {
  const { getTemplates, templates } = useTemplateStore();
  const [title, setTitle] = useState<string>(templatesDefaultData[0].title);
  const [content, setContent] = useState<string>(
    templatesDefaultData[0].content
  );
  const [imageUrl, setImageUrl] = useState<string>(
    templatesDefaultData[0].imageUrl
  );
  const [logoUrl, setLogoUrl] = useState<string>(
    templatesDefaultData[0].logoUrl
  );
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [ogImageUrl, setOgImageUrl] = useState<string>("");

  const metaTags = {
    linkedin: `<meta property="og:title" content="${title}" />
<meta property="og:description" content="${content}" />
<meta property="og:image" content="${ogImageUrl}" />`,
    twitter: `<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${content}" />
<meta name="twitter:image" content="${ogImageUrl}" />`,
    facebook: `<meta property="og:title" content="${title}" />
<meta property="og:description" content="${content}" />
<meta property="og:image" content="${ogImageUrl}" />
<meta property="og:type" content="website" />`,
  };

  function updateOgImageUrl(url: string) {
    setOgImageUrl(url);
  }
  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <OGImageForm
          templates={templates}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setLogoUrl={setLogoUrl}
          updateOgImageUrl={updateOgImageUrl}
          setSelectedTemplate={setSelectedTemplate}
          selectedTemplate={selectedTemplate}
        />
      </Card>
      <Card className="p-6">
        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="meta-tags">Meta Tags</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            {selectedTemplate ? (
              <TemplatePreview
                title={title}
                content={content}
                imageUrl={imageUrl}
                logoUrl={logoUrl}
                jsxString={selectedTemplate.jsx}
              />
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">OG Image Preview</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="meta-tags" className="mt-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Copy Meta Tags</h2>
              {Object.entries(metaTags).map(([platform, tags]) => (
                <div className="relative" key={platform}>
                  <h3 className="font-semibold capitalize">{platform}</h3>
                  <pre className="bg-gray-100 p-4 text-sm rounded-md overflow-x-auto">
                    <code>{tags}</code>
                  </pre>
                  <Button
                    onClick={() => navigator.clipboard.writeText(tags)}
                    size="icon"
                    variant="ghost"
                    className="absolute top-6 right-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy meta tags</span>
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default OGImageGenerator;
