// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs'; // Explicitly use Node.js runtime

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, filename);

    // Create directory if it doesn't exist
    try {
      await writeFile(filePath, buffer);
    } catch (err) {
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filePath, buffer);
    }

    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

async function mkdir(dir: string, options?: any) {
  const { mkdir } = await import('fs/promises');
  return mkdir(dir, options);
}