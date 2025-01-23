import { UserToken } from "@app/interfaces";
import { CookieOptions, Response } from "express";

export const generateVerificationToken = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const setUserTokenCookie = (
  res: Response,
  user_token: UserToken
): void => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 60 * 60 * 1000),
    priority: "high",
    path: "/",
  };
  cookieOptions.maxAge = 86400000;
  res.cookie("refresh_token", user_token.refresh_token, cookieOptions);
  res.cookie("access_token", user_token.access_token, cookieOptions);
  return;
};

export const clearUserTokenCookie = (res: Response): void => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  };

  res.clearCookie("refresh_token", cookieOptions);
  res.clearCookie("access_token", cookieOptions);

  return;
};
