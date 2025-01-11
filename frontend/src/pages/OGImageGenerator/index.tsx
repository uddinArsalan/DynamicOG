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
  const [defaultTab,setDefaultTab] = useState("preview");

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
    setDefaultTab("meta-tags");
  }
  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <div className="container mx-auto p-4 space-y-6">
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-4 sm:p-6 overflow-hidden">
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
      <Card className="p-4 sm:p-6">
        <Tabs defaultValue={defaultTab} value={defaultTab}>
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
                  <h3 className="font-semibold capitalize mb-2">{platform}</h3>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm max-h-40">
                      <code className="whitespace-pre-wrap break-words">{tags}</code>
                    </pre>
                    <Button
                      onClick={() => navigator.clipboard.writeText(tags)}
                      size="icon"
                      variant="ghost"
                      className="absolute top-1 right-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy {platform} meta tags</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  </div>
  );
};

export default OGImageGenerator;
