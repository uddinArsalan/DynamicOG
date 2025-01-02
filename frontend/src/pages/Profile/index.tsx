import { useState } from "react";
import { PlusCircle, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLATFORM, SocialLinksType } from "@/types";
import { useAuthStore } from "@/store/AuthStore";

const ProfilePage = () => {
  const { userInfo, updateSocialLink } = useAuthStore();
  const [socialLinks, setSocialLinks] = useState<SocialLinksType[]>(
    userInfo?.socialLinks || []
  );

  const handleUrlChange = (index: number, newUrl: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].url = newUrl;
    setSocialLinks(updatedLinks);
  };
  const handlePlatformChange = (index: number, platform: PLATFORM) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].platform = platform;
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "twitter", url: "" }]);
  };

  const saveChanges = async () => {
    try {
      const updatedLinks = socialLinks;
      await Promise.all(
        updatedLinks.map((link) =>
          updateSocialLink({ platform: link.platform, url: link.url })
        )
      );
      toast.success("Social links updated successfully!");
    } catch (err) {
      console.error("Error updating social links:", err);
      toast.error("Failed to update social links.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt={userInfo?.name}
            />
            <AvatarFallback>
              {userInfo?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userInfo?.name}</CardTitle>
            <p className="text-muted-foreground">{userInfo?.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={userInfo?.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo?.email}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSocialLink}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>
              {socialLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Select
                    defaultValue={link.platform}
                    onValueChange={(value) =>
                      handlePlatformChange(index, value as PLATFORM)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="reddit">Reddit</SelectItem>
                      <SelectItem value="threads">Threads</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Enter URL"
                    value={link.url}
                    className="flex-grow"
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                  />
                  <Button type="button" size="icon" variant="ghost">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {socialLinks.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No social links added yet. Click 'Add Link' to get started.
                </p>
              )}
            </div>

            <Button type="button" className="w-full" onClick={saveChanges}>
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
