type availablePlatforms = "twitter" | "linkedin" | "reddit" | "threads";

export interface SocialLinksType {
  platforms: availablePlatforms;
  url: String;
}

export interface PostType {
  author: string;
  template_id: string;
  logo_url?: string;
  imageUrl: string;
  title: string;
  content: string;
  ogImageUrl : string | undefined
}
