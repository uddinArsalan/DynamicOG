import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Template } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "@/axios/axiosInstance";

interface PostProps {
  title: string;
  templates: Template[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
  selectedTemplate: Template | null;
  updateOgImageUrl: (url: string) => void;
}

const OGImageForm: React.FC<PostProps> = ({
  title,
  templates,
  setTitle,
  content,
  setContent,
  setLogoUrl,
  setImageUrl,
  setSelectedTemplate,
  selectedTemplate,
  updateOgImageUrl,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImgFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadAndGeneration = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrlRes: string | null = null;
    let logoUrlRes: string | null = null;

    const uploadFiles = async (files: { [key: string]: File }) => {
      const formData = new FormData();
      for (const [fieldName, file] of Object.entries(files)) {
        formData.append(fieldName, file);
      }

      const uploadResponse = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.status !== 200) {
        throw new Error(`Error uploading `);
      }
      return uploadResponse.data.data.uploadResults;
    };

    try {
      setLoading(true);
      const filesToUpload: { [key: string]: File } = {};
      if (imgFile) filesToUpload["bgImage"] = imgFile;
      if (logoFile) filesToUpload["logoImage"] = logoFile;
      const uploadResults = await toast.promise(
        () => uploadFiles(filesToUpload),
        {
          pending: "Uploading files...",
          success: "Files uploaded successfully! 🎉",
          error: "File upload failed. ⚠️",
        }
      );

      imageUrlRes = uploadResults.bgImage || null;
      logoUrlRes = uploadResults.logoImage || null;

      await toast.promise(
        async () => {
          const generateResponse = await axios.post("/og/generate", {
            selectedTemplateId: selectedTemplate?._id,
            title,
            content,
            imageUrl: imageUrlRes,
            logoUrl: logoUrlRes,
          });

          if (generateResponse.status !== 200) {
            throw new Error(`Error generating `);
          }

          const ogImageUrl = generateResponse.data.data.ogImageUrl;
          updateOgImageUrl(ogImageUrl);
          console.log("Generation successful:", ogImageUrl);
        },
        {
          pending: "Generating OG image...🎉",
          success: "OG image generated!",
          error: "OG generation failed.  ⚠️",
        }
      );
    } catch (error) {
      console.error("Error during upload or generation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New OG Image</h2>
      <p className="mb-6 text-muted-foreground">
        DynamicOg is a tool for generating dynamic Open Graph images based on
        post content. Use the form below to create a new post and generate a
        unique OG image automatically.
      </p>
      <form onSubmit={handleUploadAndGeneration} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select
              onValueChange={(name: string) =>
                setSelectedTemplate(
                  templates.find((t) => t.name === name) || null
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Templates</SelectLabel>
                  {templates.map((template) => (
                    <SelectItem key={template._id} value={template.name}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your post"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Description</Label>
          <Textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the description of your post"
            rows={4}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bgImage">Background Image</Label>
            <Input
              id="bgImage"
              name="bgImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logoImage">Logo (Optional)</Label>
            <Input
              id="logoImage"
              name="logoImage"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>
        </div>
        {/* <div className="space-y-2">
        <Label htmlFor="optionalImage">Upload Image (Optional)</Label>
        <div className="flex items-center space-x-4">
          <Input
            id="optionalImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          )}
        </div>
      </div> */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Generating..." : "Generate OG Image"}
        </Button>
      </form>
    </div>
  );
};

export default OGImageForm;
