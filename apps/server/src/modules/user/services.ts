import { eq } from "drizzle-orm";
import * as argon2 from "argon2";
import { db } from "#/db/index.js";
import { users } from "#/db/schemas/user.js";
import { refreshTokens } from "#/db/schemas/refresh-token.js";
import { HttpError, HttpStatus } from "#/utils/http/index.js";

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async (
  userId: string,
  body: ChangePasswordInput,
) => {
  const { currentPassword, newPassword } = body;

  if (currentPassword === newPassword) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "New password must be different from current password",
    );
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!user) {
    throw new HttpError(HttpStatus.NOT_FOUND, "User not Found");
  }

  const isPasswordValid = await argon2.verify(user.password, currentPassword);
  if (!isPasswordValid) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, "Incorrect Password");
  }

  const hashedPassword = await argon2.hash(newPassword);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));

  return {
    success: true as const,
    message: "Password changed successfully",
  };
};

export const getMe = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      avatar: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  if (!user) {
    throw new HttpError(HttpStatus.NOT_FOUND, "User not found");
  }

  return user;
};
