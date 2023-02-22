import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const tokenGenerator = (payload: { sid: string; email: string }) => {
  const { sid, email } = payload;

  const token = jwt.sign({ sid, email }, JWT_SECRET || "1234", {
    expiresIn: "7d",
  });

  return token;
};

export const verifyJWTToken = (token: string) => {
  try {
    const result = jwt.verify(token, JWT_SECRET || "1234");

    return result;
  } catch (_) {
    throw {
      status: 401,
      success: false,
      message: "Faild to login! try again!",
    };
  }
};
