export interface User {
  id: number; // Unique user ID
  first_name: string; // User's first name
  last_name: string; // User's last name
  user_name: string; // User's username
  password: string;
  avatar: string; // URL to the user's avatar
  email: string; // User's email address
  birth_of_day: string; // ISO 8601 date string for birth date
  phone_number: string; // User's phone number
  is_verified: boolean; // Verification status
  createdAt: string; // ISO 8601 timestamp for creation time
  updatedAt: string; // ISO 8601 timestamp for last update
}
