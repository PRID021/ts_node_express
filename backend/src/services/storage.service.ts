import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Set up S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const localStoragePath = path.join(__dirname, "../../uploads");

const storageType = process.env.STORAGE_TYPE || "local"; // Use local storage by default

export const saveFile = async (file: Express.Multer.File): Promise<string> => {
  if (storageType === "s3") {
    // Save to S3 using AWS SDK v3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${Date.now()}-${file.originalname}`, // Unique file name
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    try {
      const uploadResult = await s3.send(command);
      console.log("File uploaded to S3:", uploadResult);
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  } else {
    // Save to local storage
    const filePath = path.join(localStoragePath, `${file.originalname}`);

    // Ensure the local uploads directory exists
    if (!fs.existsSync(localStoragePath)) {
      fs.mkdirSync(localStoragePath, { recursive: true });
    }

    // Save the file locally
    fs.writeFileSync(filePath, file.buffer);
    console.log("File saved locally:", filePath);
    return filePath; // Return the local file path
  }
};
