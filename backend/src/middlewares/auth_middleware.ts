import { UserToken } from "@app/interfaces";
import { updateUserRefreshToken } from "@services/token.service";
import { setUserTokenCookie } from "@utils/verification_helper";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

/**
 * Middleware to handle access token authentication and automatic refresh if expired.
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log("Cookie: ", req.cookies);

  const access_token = req.cookies.access_token; // HttpOnly cookie
  const refresh_token = req.cookies.refresh_token; // HttpOnly cookie

  if (!access_token) {
    return res.status(401).json({ message: "Access token required." });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(access_token, JWT_ACCESS_SECRET) as {
      user_id: number;
      email: string;
    };
    console.log("decode: ", decoded);
    // Attach user info to the request object
    req.user = decoded;

    // Call next() to pass control to the next middleware
    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError" && refresh_token) {
      console.log("Perform logic re-new token");

      try {
        // Verify the refresh token
        const { user_id, email } = jwt.verify(
          refresh_token,
          JWT_REFRESH_SECRET
        ) as {
          user_id: number;
          email: string;
        };

        const userToken: UserToken = await updateUserRefreshToken(
          user_id.toString(),
          refresh_token
        );
        setUserTokenCookie(res, userToken);

        // Attach user info to the request object
        req.user = { user_id, email };

        return next();
      } catch (refreshErr) {
        console.error("Error verifying refresh token:", refreshErr);
        return res
          .status(401)
          .json({ message: "Invalid or expired refresh token." });
      }
    }

    console.error("Error verifying access token:", err);
    return res
      .status(401)
      .json({ message: "Invalid or expired access token." });
  }
};
