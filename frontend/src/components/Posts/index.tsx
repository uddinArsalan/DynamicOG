import { useState, useEffect } from "react";
import PostPage from "../Post";
import TemplatePreview from "../TemplatesPreview";
import { templatesDefaultData } from "@/data";
import { Template } from "@/types";
import { useTemplateStore } from "@/store/TemplatesStore";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Posts = () => {
  const { getTemplates, templates } = useTemplateStore();
  const [title, setTitle] = useState<string>(templatesDefaultData[0].title);
  const [content, setContent] = useState<string>(templatesDefaultData[0].content);
  const [imageUrl, setImageUrl] = useState<string>(
    templatesDefaultData[0].imageUrl
  );
  const [logoUrl, setLogoUrl] = useState<string>(templatesDefaultData[0].logoUrl);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [ogImageUrl,setOgImageUrl] = useState<string>("");
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
  function updateOgImageUrl(url : string){
    setOgImageUrl(url)
  }
  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <PostPage
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
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
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
                <div className="h-64 flex justify-center items-center border-2 border-dashed rounded-xl">
                  <span className="text-xl text-gray-500">
                    Select a template to preview
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Copy Meta Tags</h2>
              <Tabs defaultValue="linkedin">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                  <TabsTrigger value="facebook">Facebook</TabsTrigger>
                </TabsList>
                {Object.entries(metaTags).map(([platform, tags]) => (
                  <TabsContent key={platform} value={platform}>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{tags}</code>
                    </pre>
                    <Button
                      onClick={() => navigator.clipboard.writeText(tags)}
                      className="mt-4"
                    >
                      Copy{" "}
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}{" "}
                      Meta Tags
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Posts;
