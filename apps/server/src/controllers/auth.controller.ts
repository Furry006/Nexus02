import type { Context } from "hono";

export const register = async (c: Context) => {
  const body = c.req.valid("json");

  const { username, fullName, email, password } = body;

  console.log({
    username,
    fullName,
    email,
    password,
  });

  return c.json(
    {
      success: true,
      message: "Register endpoint working",
    },
    201,
  );
};

export const login = async (c: Context) => {
  const body = c.req.valid("json");

  const { email, password } = body;

  console.log({
    email,
    password,
  });

  return c.json({
    success: true,
    message: "Login endpoint working",
  });
};

export const logout = async (c: Context) => {
  return c.json({
    success: true,
    message: "Logout endpoint working",
  });
};

export const refreshToken = async (c: Context) => {
  return c.json({
    success: true,
    message: "Refresh token endpoint working",
  });
};

export const getMe = async (c: Context) => {
  return c.json({
    success: true,
    message: "Current user endpoint working",
  });
};
