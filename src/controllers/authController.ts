import { UserToken } from "@app/interfaces";
import User from "@models/user";
import { createUserToken, refreshUserToken } from "@services/tokenService";
import {
  create200Response,
  create400CommonReponse,
  create404Response,
  create500Response,
} from "@utils/commonResponses";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

/**
 * Authenticate a user and generate access and refresh tokens.
 */
export const authenticateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return create400CommonReponse(res, "Email and password are required.");
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return create404Response(res, "user");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    const userToken: UserToken = await createUserToken(user);
    create200Response<UserToken>({
      res: res,
      message: "Authentication successful.",
      data: userToken,
    });
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Refresh access token using the refresh token.
 */
export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required." });
    return;
  }
  try {
    const { accessToken } = await refreshUserToken(userId, refreshToken);
    res.status(200).json({
      message: "Access token refreshed.",
      accessToken,
    });
  } catch (err) {
    console.error("Error refreshing access token:", err);
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    create500Response(res, "Name, email, and password are required.");
    return;
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    create200Response({
      res,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (err) {
    create500Response(res, "Failed to create user.");
    console.error("Error creating user:", err);
  }
};
