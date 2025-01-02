import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp, Copy, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { usePostStore } from "@/store/PostStore";
import { BasicOGPostDetails } from "@/types";

export default function UserOGPosts() {
  const { getPosts, loading, posts, deletePost,isDelete } = usePostStore();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  useEffect(() => {
    getPosts();
  }, [isDelete,getPosts]);

  if (loading) return <div>Loading Posts</div>;

  const handleCopyMetaTags = (post: BasicOGPostDetails) => {
    const metaTags = `
<meta property="og:title" content="${post.title}" />
<meta property="og:description" content="${post.content}" />
<meta property="og:image" content="${post.ogImageUrl}" />
<meta property="og:type" content="website" />
    `.trim();

    navigator.clipboard.writeText(metaTags).then(
      () => {
        toast.success("Meta tags copied");
      },
      () => {
        toast.error("Failed to copy");
      }
    );
  };

  const toggleExpand = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your OG Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="flex flex-col">
            <CardContent className="p-4">
              <img
                src={post.ogImageUrl}
                alt={`OG Image for ${post.title}`}
                className="w-full aspect-[1200/630] object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Created on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <Button
                variant="outline"
                className="w-full mb-2"
                onClick={() => toggleExpand(post._id)}
              >
                {expandedPost === post._id ? (
                  <>
                    Hide Meta Tags <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show Meta Tags <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              {expandedPost === post._id && (
                <div className="bg-muted p-4 rounded-md mb-4 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
                    <code>
                      {`<meta property="og:title" content="${post.title}" />
<meta property="og:description" content="${post.content}" />
<meta property="og:image" content="${post.ogImageUrl}" />
<meta property="og:type" content="website" />`}
                    </code>
                  </pre>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyMetaTags(post)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Meta Tags</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deletePost(post._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete OG Image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
