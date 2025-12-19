import { writeFile} from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function saveImage(file: File): Promise<string | null> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public/images');
    try {
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);
        return `/images/${filename}`;
    } catch (error) {
        console.error("Error saving image:", error);
        return null;
    }
}