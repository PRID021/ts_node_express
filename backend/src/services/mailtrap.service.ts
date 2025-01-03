import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  RESET_PASSWORD_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "@templates/email.template";
import Bull from "bull";

dotenv.config();

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN!,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

const emailQueue = new Bull("emailQueue", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD || undefined,
  },
});

// Listen for events
emailQueue.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

emailQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

emailQueue.on("progress", (job, progress) => {
  console.log(`Job ${job.id} progress: ${progress}%`);
});

const sendVerificationEmail = async (
  email: string,
  verification_token: string
): Promise<void> => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email.",
      html: VERIFICATION_EMAIL_TEMPLATE!.replace(
        "{verificationCode}",
        verification_token
      ),
      category: "Email Verification.",
    });
  } catch (error) {
    throw Error(`Error sending verification email: ${error}`);
  }
};

const sendWelcomeEmail = async (
  email: string,
  user_name: string
): Promise<void> => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome",
      html: WELCOME_EMAIL_TEMPLATE!
        .replace("{user_name}", user_name)!
        .replace("{email}", email),
      category: "Email Welcome.",
    });
  } catch (error) {
    throw Error(`Error sending welcome email: ${error}`);
  }
};

const sendResetPasswordEmail = async (
  email: string,
  reset_password_token: string
): Promise<void> => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: RESET_PASSWORD_EMAIL_TEMPLATE!.replace(
        "{reset_password_token}",
        reset_password_token
      )!,
      category: "Email Reset Password",
    });
  } catch (error) {
    throw Error(`Error sending welcome email: ${error}`);
  }
};

export const sendChangePasswordSuccessEmail = async (
  email: string
): Promise<void> => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Changed Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Change",
    });
    console.log("Password change success email sent successfully: ", response);
  } catch (error) {
    console.error("Error sending password change success email:", error);
    throw Error(`Error sending password change success email: ${error}`);
  }
};

emailQueue.process("sendResetPasswordEmail", async (job) => {
  try {
    const { email, reset_password_token } = job.data;
    console.log(`Processing sendResetPasswordEmail job: ${job.id}`);
    await sendResetPasswordEmail(email, reset_password_token);
    console.log(`Completed sendResetPasswordEmail job: ${job.id}`);
  } catch (error) {
    console.error(
      `Error processing sendResetPasswordEmail job ${job.id}:`,
      error
    );
    throw error; // Rethrow the error to retry or mark the job as failed
  }
});

// Processor for sendVerificationEmail
emailQueue.process("sendVerificationEmail", async (job) => {
  try {
    const { email, verification_token } = job.data;
    console.log(`Processing sendVerificationEmail job: ${job.id}`);
    await sendVerificationEmail(email, verification_token);
  } catch (error) {
    console.error(
      `Error processing sendVerificationEmail job ${job.id}:`,
      error
    );
  }
});

// Processor for sendWelcomeEmail
emailQueue.process("sendWelcomeEmail", async (job) => {
  try {
    const { email, user_name } = job.data;
    console.log(`Processing sendWelcomeEmail job: ${job.id}`);
    await sendWelcomeEmail(email, user_name);
    console.log(`Job ${job.id} completed successfully`);
  } catch (error) {
    console.error(`Error processing sendWelcomeEmail job ${job.id}:`, error);
  }
});

emailQueue.process("sendChangePasswordSuccessEmail", async (job) => {
  try {
    const { email } = job.data;
    console.log(`Processing sendChangePasswordSuccessEmail job: ${job.id}`);
    await sendChangePasswordSuccessEmail(email);
  } catch (error) {
    console.error(
      `Error processing sendChangePasswordSuccessEmail job ${job.id}:`,
      error
    );
  }
});

// Function to add verification email task to queue
export const queueVerificationEmail = async (
  email: string,
  verification_token: string
) => {
  try {
    const job = await emailQueue.add("sendVerificationEmail", {
      email,
      verification_token,
    });
    console.log(`Verification email job added to queue with ID: ${job.id}`);
  } catch (error) {
    console.error("Error adding verification email task to queue:", error);
    throw Error(`Error adding task to queue: ${error}`);
  }
};

// Function to add welcome email task to queue
export const queueWelcomeEmail = async (email: string, user_name: string) => {
  try {
    const job = await emailQueue.add("sendWelcomeEmail", {
      email,
      user_name,
    });
    console.log(`Welcome email job added to queue with ID: ${job.id}`);
  } catch (error) {
    console.error("Error adding welcome email task to queue:", error);
    throw Error(`Error adding task to queue: ${error}`);
  }
};

export const queueResetPasswordEmail = async (
  email: string,
  reset_password_token: string
): Promise<void> => {
  try {
    const job = await emailQueue.add("sendResetPasswordEmail", {
      email,
      reset_password_token,
    });
    console.log(`Reset password email job added to queue with ID: ${job.id}`);
  } catch (error) {
    console.error("Error adding reset password email task to queue:", error);
    throw Error(`Error adding reset password email task to queue: ${error}`);
  }
};

export const queueChangePasswordSuccessEmail = async (
  email: string
): Promise<void> => {
  try {
    const job = await emailQueue.add("sendChangePasswordSuccessEmail", {
      email,
    });
    console.log(
      `Change password success email job added to queue with ID: ${job.id}`
    );
  } catch (error) {
    console.error(
      "Error adding change password success email task to queue:",
      error
    );
    throw Error(`Error adding task to queue: ${error}`);
  }
};

// Export queue instance for monitoring or other purposes
export { emailQueue };
