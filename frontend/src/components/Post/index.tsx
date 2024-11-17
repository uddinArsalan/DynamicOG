import { useState } from "react";
import { toast } from "react-toastify";

const PostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAndGeneration = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | null = null;

    if (file) {
      const formData = new FormData();
      formData.append("optionalImage", file);

      try {
        setLoading(true);
        await toast.promise(
          async () => {
            const uploadResponse = await fetch(
              "http://localhost:3000/api/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!uploadResponse.ok) {
              throw new Error(`HTTP error! status: ${uploadResponse.status}`);
            }

            imageUrl = await uploadResponse.text();
          },
          {
            pending: "Uploading your image... Please wait.",
            success: "Image uploaded successfully! 🎉",
            error: "Failed to upload the image. Please try again. ⚠️",
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        return;
      }
    }

    try {
      await toast.promise(
        async () => {
          const generateResponse = await fetch(
            "http://localhost:3000/api/og/generate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                content,
                imageUrl,
              }),
            }
          );

          if (!generateResponse.ok) {
            throw new Error(`HTTP error! status: ${generateResponse.status}`);
          }

          const generateResult = await generateResponse.json();
          console.log("Generation successful:", generateResult);
        },
        {
          pending: "Generating your Open Graph image... Please wait.",
          success: "OG image generated successfully! 🎉",
          error: "Failed to generate OG image. Please try again. ⚠️",
        }
      );
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white flex justify-center items-center px-4 py-16 min-h-screen">
      <form
        onSubmit={handleUploadAndGeneration}
        encType="multipart/form-data"
        className="flex flex-col gap-6 p-8 w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-2">Create a New Post</h1>
        <p className="text-gray-400 mb-6">
          DynamicOg is a tool for generating dynamic Open Graph images based on
          post content. Use the form below to create a new post and generate a
          unique OG image automatically.
        </p>
        <div className="flex flex-col mb-4">
          <label className="text-xl mb-2" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.currentTarget.value)}
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of your post"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-xl mb-2" htmlFor="content">
            Description:
          </label>
          <textarea
            id="content"
            value={content}
            name="content"
            onChange={(e) => setContent(e.currentTarget.value)}
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter the description of your post"
          />
        </div>
        <div className="flex flex-col mb-4">
          <div className="text-xl mb-2">Add an Image (Optional):</div>
          <div className="flex items-center">
            <label
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md cursor-pointer flex items-center"
              htmlFor="optionalImage"
            >
              <input
                id="optionalImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                name="optionalImage"
              />
              Choose File
            </label>
            {imagePreview && (
              <div className="ml-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-md border border-gray-700 h-20"
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostPage;
