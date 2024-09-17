import { generate } from '../services/ogImageGenerator.js';
import { save } from '../services/imageStorage.js';
import { Request, Response } from 'express';

export async function generateOGImage(req: Request, res: Response) {
  try {
    const { title, content, imageUrl } = req.body;

    if (typeof title !== 'string' || typeof content !== 'string') {
      return res.status(400).json({ error: 'Invalid title or content' });
    }

    const image = await generate(title, content, imageUrl);
    const ogImageUrl = await save(image);
    res.json({ ogImageUrl });
  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}