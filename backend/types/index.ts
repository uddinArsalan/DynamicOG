type availablePlatforms = 'twitter'| 'linkedin' | 'reddit' | 'threads'

export interface SocialLinksType {
  platforms : availablePlatforms,
  url : String
}