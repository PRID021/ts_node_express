// src/types/express.d.ts
import { UserAttributes } from "../models/User";  // Update this path to your actual User model

declare global {
    namespace Express {
        interface Request {
            user?: UserAttributes;  // Add 'user' property to Request with the type of your User model
        }
    }
}
