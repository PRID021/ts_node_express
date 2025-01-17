import { UserToken } from "@app/interfaces";
import RefreshToken from "@models/refresh_token.model";
import User from "@models/user.model";
import { sequelize } from "@settings/database";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION!;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION!;

export const createUserToken = async (user: User): Promise<UserToken> => {
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const access_token = jwt.sign(
      { user_id: user.id, email: user.email, user_name: user.user_name },
      JWT_ACCESS_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRATION }
    );
    const refresh_token = jwt.sign(
      { user_id: user.id, email: user.email, user_name: user.user_name },
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRATION }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
    await RefreshToken.destroy({
      where: { user_id: user.id },
      transaction,
    });
    await RefreshToken.create(
      {
        user_id: user.id,
        refresh_token: refresh_token,
        expires_at: expiresAt,
      },
      { transaction }
    );
    await transaction.commit();
    return {
      access_token,
      refresh_token,
    } satisfies UserToken;
  } catch (err) {
    await transaction.rollback();
    throw new Error("Failed to create user tokens");
  }
};

export const invalidateToken = async (
  user_id: string,
  refresh_token: string
): Promise<boolean> => {
  console.log("Starting invalidateToken");

  try {
    const deletedRows = await RefreshToken.destroy({
      where: { user_id: user_id, refresh_token: refresh_token },
    });

    console.log("Delete row number's", deletedRows);

    if (deletedRows > 0) {
      console.log("Token invalidated successfully");
      return true; // Explicitly return true if rows were deleted
    } else {
      console.log("No matching token found to delete");
      return false; // Explicitly return false if no rows were deleted
    }
  } catch (error) {
    console.error("Error deleting refresh token:", error);
    return false; // Explicitly return false on error
  } finally {
    console.log("invalidateToken function complete");
  }
};

export const updateUserRefreshToken = async (
  user_id: string,
  refresh_token: string
): Promise<UserToken> => {
  const storedToken = await RefreshToken.findOne({
    where: { user_id: user_id, refresh_token: refresh_token },
  });

  // Step 1: Check if the refresh token exists in the database
  if (!storedToken) {
    throw new Error("Invalid or missing refresh token.");
  }
  // Step 2: Verify if the refresh token has expired
  const now = new Date();
  if (storedToken.expires_at < now) {
    await storedToken.destroy();
    throw new Error("Refresh token has expired.");
  }

  // Step 3: Verify the refresh token using JWT
  let decoded;
  try {
    decoded = jwt.verify(storedToken.refresh_token, JWT_REFRESH_SECRET) as {
      user_id: number;
      email: string;
      user_name: string;
    };
  } catch (err) {
    throw new Error("Invalid refresh token.");
  }

  // Step 4: Generate a new access token
  const access_token = jwt.sign(
    { user_id: decoded.user_id, email: decoded.email, name: decoded.user_name },
    JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRATION }
  );

  // Step 5: Return the new tokens
  const userToken: UserToken = {
    access_token,
    refresh_token,
  };
  return userToken;
};
