import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_VERIFICATION_SECRET = process.env.JWT_VERIFICATION_SECRET!;
const JWT_VERIFICATION_EXPIRATION = process.env.JWT_VERIFICATION_EXPIRATION!;

export const getUserIdFromCookie = (req: Request): number | undefined => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return undefined;
    }
    const decoded = jwt.verify(token, JWT_VERIFICATION_SECRET) as {
      userId: number;
    };
    return decoded.userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
};

export const generateVerificationToken = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenAndSetCookie = (
  res: Response,
  userId: number
): string => {
  const token = jwt.sign({ userId }, JWT_VERIFICATION_SECRET, {
    expiresIn: JWT_VERIFICATION_EXPIRATION,
  });
  res.cookie("token", token, {
    httpOnly: true, // XSS cookie can't access by client js
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // csrf
    maxAge: 7 * 60 * 1000,
  });

  return token;
};
