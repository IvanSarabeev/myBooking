import dummyBooks from "@/constants/dummybooks.json";
import { logChalkMessage } from "@/lib/utils";
import { booksSchema } from "@/database";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import ImageKit from "imagekit";

config({ path: ".env.local" });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

console.log(process.env.DATABASE_URL);

const neonSql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: neonSql });

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string,
) => {
  try {
    const imageKitResponse = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return imageKitResponse.filePath;
  } catch (error: unknown) {
    logChalkMessage("Error uploading image to ImageKit", "error");

    throw new Error("Error uploading image to ImageKit");
  }
};

const seed = async () => {
  logChalkMessage("Seeding...", "", "info");

  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers",
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos",
      )) as string;

      await db.insert(booksSchema).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    logChalkMessage(
      "Data seeding Completed.",
      "Data seeded successfully",
      "success",
    );
  } catch (error: unknown) {
    logChalkMessage(error, "Seeding failed");
  }
};

seed();
