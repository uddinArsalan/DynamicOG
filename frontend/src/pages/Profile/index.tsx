import { useState } from "react";
import { PlusCircle, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SocialLinksType } from "@/types";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  socialLinks: [],
};

const ProfilePage = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinksType[]>(
    user.socialLinks
  );

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "twitter", url: "" }]);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={user.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} readOnly />
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
                  <Select defaultValue={link.platform}>
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

            <Button type="button" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
