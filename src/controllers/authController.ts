import { UserToken } from "@app/interfaces";
import User from "@models/user";
import { appErrorCodes, appErrorMessages } from "@res/appErrors";
import {
  ApiResponse,
  common200001Reponse,
  commonBadResponse,
  missTokenResponse,
  unhandledErrorResponse,
} from "@res/commons";
import {
  createUserToken,
  invalidateToken,
  updateUserToken,
} from "@services/tokenService";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

/**
 * Authenticate a user and generate access and refresh tokens.
 */
export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  let errorResponse: ApiResponse;
  if (!email || !password) {
    errorResponse = {
      statusCode: appErrorCodes.unauthorized.login.blank,
      message: appErrorMessages.unauthorized.login.blank,
    };
    res.status(400).json(errorResponse);
    return;
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      errorResponse = {
        statusCode: appErrorCodes.unauthorized.common,
        message: appErrorMessages.unauthorized.common,
      };
      res.status(400).json(errorResponse);
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      errorResponse = {
        statusCode: appErrorCodes.unauthorized.invalid,
        message: appErrorMessages.unauthorized.invalid,
      };
      res.status(401).json(errorResponse);
      return;
    }
    const userToken: UserToken = await createUserToken(user);
    res.status(200).json(common200001Reponse<UserToken>(userToken));
    return;
  } catch (err) {
    const response: ApiResponse = {
      statusCode: appErrorCodes.internalServerError.common,
      message: appErrorMessages.internalServerError.common,
    };
    res.status(500).json(response);
    return;
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(500).json(commonBadResponse);
    return;
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(200).json(common200001Reponse<User>(newUser));
    return;
  } catch (err) {
    res.status(999).json(unhandledErrorResponse);
  }
};

/**
 * Refresh access token using the refresh token.
 */
export const refresh = async (req: Request, res: Response): Promise<void> => {
  const { userId, refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).json(missTokenResponse);
    return;
  }
  try {
    const newUserToken = await updateUserToken(userId, refreshToken);
    res.status(200).json(common200001Reponse<UserToken>(newUserToken));
  } catch (err) {
    res.status(999).json(unhandledErrorResponse);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { userId, refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).json(missTokenResponse);
    return;
  }
  try {
    await invalidateToken(userId, refreshToken);
    res.status(200).json(common200001Reponse());
    return;
  } catch (error) {
    res.status(999).json(unhandledErrorResponse);
  }
};
