import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, Copy } from "lucide-react";

const templates = [
  { id: "default", name: "Default" },
  { id: "minimal", name: "Minimal" },
  { id: "gradient", name: "Gradient" },
];

export function OGImageGenerator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, logoUrl, imageUrl, selectedTemplate });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="template">Choose Template</Label>
            <RadioGroup
              id="template"
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
              className="flex space-x-4"
            >
              {templates.map((template) => (
                <div key={template.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={template.id} id={template.id} />
                  <Label htmlFor={template.id}>{template.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="logo"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Enter logo URL"
              />
              <Button type="button" size="icon" variant="outline">
                <ImagePlus className="h-4 w-4" />
                <span className="sr-only">Upload logo</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <Button type="button" size="icon" variant="outline">
                <ImagePlus className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Generate OG Image
          </Button>
        </form>
      </Card>
      <Card className="p-6">
        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="meta-tags">Meta Tags</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">OG Image Preview</p>
            </div>
          </TabsContent>
          <TabsContent value="meta-tags" className="mt-4">
            <div className="space-y-4">
              {["twitter", "linkedin", "facebook"].map((platform) => (
                <div key={platform} className="space-y-2">
                  <h3 className="font-semibold capitalize">{platform}</h3>
                  <div className="bg-muted p-2 rounded-md relative">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${content}" />`}</code>
                    </pre>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        // Copy meta tags to clipboard
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy meta tags</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
