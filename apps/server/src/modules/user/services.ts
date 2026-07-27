import { eq } from "drizzle-orm";
import * as argon2 from "argon2";

import { db } from "#/db/index.js";
import { users } from "#/db/schemas/user.js";
import { refreshTokens } from "#/db/schemas/refresh-token.js";

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
    throw new Error("New password must be different from current password");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!user) {
    throw new Error("User not Found");
  }

  const isPasswordValid = await argon2.verify(user.password, currentPassword);
  if (!isPasswordValid) {
    throw new Error("Incorrect Password");
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
