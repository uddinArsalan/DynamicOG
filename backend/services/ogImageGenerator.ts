import { getOGImageTemplate } from "../utils/htmlTemplates.js";
import { ImageResponse } from '@vercel/og';

export async function generate(
  title: string,
  content: string,
  imageUrl: string | null
) {
  const reactElement = getOGImageTemplate(title, content, imageUrl);
  
  const imageResponse = new ImageResponse(reactElement as React.ReactElement, {
    width: 1200,
    height: 630,
  });

  const imageBuffer = await imageResponse.arrayBuffer();
  return Buffer.from(imageBuffer);
}