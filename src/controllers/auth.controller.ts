import { UserToken } from "@app/interfaces";
import User from "@models/user.model";
import { appErrorCodes, appErrorMessages } from "@utils/res/app_errors";
import {
  ApiResponse,
  common200001Response,
  commonBadResponse,
  missTokenResponse,
  unhandledErrorResponse,
} from "@utils/res/commons";
import {
  queueVerificationEmail,
  queueWelcomeEmail,
} from "@services/mailtrap.service";
import {
  createUserToken,
  invalidateToken,
  updateUserToken,
} from "@services/token.service";
import {
  generateTokenAndSetCookie,
  generateVerificationToken,
  getUserIdFromCookie,
} from "@utils/verification_helper";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Op } from "sequelize";

/**
 * Authenticate a user and generate access and refresh tokens.
 */
export const signIn = async (req: Request, res: Response): Promise<any> => {
  const { user_name, password } = req.body;
  let errorResponse: ApiResponse;
  if (!user_name || !password) {
    errorResponse = {
      statusCode: appErrorCodes.unauthorized.login.blank,
      message: appErrorMessages.unauthorized.login.blank,
    };
    return res.status(400).json(errorResponse);
  }
  try {
    const user = await User.findOne({ where: { user_name } });
    if (!user) {
      errorResponse = {
        statusCode: appErrorCodes.unauthorized.common,
        message: appErrorMessages.unauthorized.common,
      };
      return res.status(400).json(errorResponse);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      errorResponse = {
        statusCode: appErrorCodes.unauthorized.invalid,
        message: appErrorMessages.unauthorized.invalid,
      };
      return res.status(401).json(errorResponse);
    }
    const userToken: UserToken = await createUserToken(user);
    return res.status(200).json(common200001Response<UserToken>(userToken));
  } catch (err) {
    const response: ApiResponse = {
      statusCode: appErrorCodes.internalServerError.common,
      message: appErrorMessages.internalServerError.common,
    };
    return res.status(500).json(response);
  }
};

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const {
    first_name,
    last_name,
    user_name,
    email,
    password,
    birth_of_day,
    phone_number,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !user_name ||
    !birth_of_day ||
    !phone_number ||
    !email ||
    !password
  ) {
    return res.status(500).json(commonBadResponse);
  }

  let isUserNameExits = await User.count({ where: { user_name } });
  if (isUserNameExits > 0) {
    const response: ApiResponse = {
      statusCode: appErrorCodes.badRequest.userExits,
      message: appErrorMessages.badRequest.userExits,
    };
    return res.status(400).json(response);
  }

  const verification_token = generateVerificationToken();
  let avatar = "https://avatar.iran.liara.run/public/45";
  try {
    const newUser = await User.create({
      first_name,
      last_name,
      user_name,
      avatar,
      email,
      password,
      birth_of_day,
      phone_number,
      verification_token,
      verification_token_expires_at: new Date(Date.now() + 10 * 60 * 1000),
      is_verified: false,
    });

    generateTokenAndSetCookie(res, newUser.id);
    queueVerificationEmail(newUser.email, verification_token);
    return res.status(200).json(common200001Response<User>(newUser));
  } catch (err) {
    return res.status(999).json(unhandledErrorResponse);
  }
};

/**
 * Refresh access token using the refresh token.
 */
export const refresh = async (req: Request, res: Response): Promise<any> => {
  const { userId, refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json(missTokenResponse);
  }
  try {
    const newUserToken = await updateUserToken(userId, refreshToken);
    return res.status(200).json(common200001Response<UserToken>(newUserToken));
  } catch (err) {
    return res.status(999).json(unhandledErrorResponse);
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  const { userId, refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json(missTokenResponse);
  }
  try {
    await invalidateToken(userId, refreshToken);
    return res.status(200).json(common200001Response());
  } catch (error) {
    return res.status(999).json(unhandledErrorResponse);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Access the userId from the decoded token
  const userId = getUserIdFromCookie(req);
  const { code } = req.body;
  if (!code || !userId) {
    let errorResponse: ApiResponse = {
      statusCode: appErrorCodes.badRequest.common,
      message: appErrorMessages.badRequest.common,
    };
    return res.status(400).json(errorResponse);
  }

  try {
    let user = await User.findOne({
      where: {
        id: userId,
        verification_token: code,
        verification_token_expires_at: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!user) {
      const errorResponse: ApiResponse = {
        statusCode: appErrorCodes.unauthorized.verify.tokenInvalid,
        message: appErrorMessages.unauthorized.verify.tokenInvalid,
      };
      return res.status(400).json(errorResponse);
    }

    user!.is_verified = true;
    user!.verification_token = undefined;
    user!.verification_token_expires_at = undefined;
    await user.save();
    queueWelcomeEmail(user.email, user.user_name);

    return res.status(200).json(common200001Response());
  } catch (error) {
    console.error(error);
    return res.status(999).json(unhandledErrorResponse);
  }
};
