import { Request, Response } from "express";
import User from "@models/user";
import { create200Response, create500Response } from "@utils/commonResponses";
import bcrypt from "bcryptjs";
import { createUserToken, refreshUserToken } from "@services/tokenService";

/**
 * Authenticate a user and generate access and refresh tokens.
 */
export const authenticateUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials." });
            return
        }
        const { accessToken, refreshToken } = await createUserToken(user);
        res.status(200).json({
            message: "Authentication successful.",
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * Refresh access token using the refresh token.
 */
export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const { userId, refreshToken } = req.body;
    if (!refreshToken) {
        res.status(400).json({ message: "Refresh token is required." });
        return
    }
    try {
        const { accessToken } = await refreshUserToken(userId, refreshToken);
        res.status(200).json({
            message: "Access token refreshed.",
            accessToken
        });
    } catch (err) {
        console.error("Error refreshing access token:", err);
        res.status(403).json({ message: "Invalid or expired refresh token." });
    }
};




export const createUser = async (req: Request, res: Response): Promise<void> => {
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
