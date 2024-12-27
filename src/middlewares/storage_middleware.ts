import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // Keep the file in memory for processing
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
