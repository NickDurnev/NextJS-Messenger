import jwt from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

interface Payload {
  id: string;
  email: string;
  name: string;
}

const DEFAULT_ACCESS_TOKEN_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

const DEFAULT_REFRESH_TOKEN_SIGN_OPTION: SignOption = {
  expiresIn: "7d",
};

export function signJwtToken(
  payload: Payload,
  type: string,
  options: SignOption = type === "access"
    ? DEFAULT_ACCESS_TOKEN_SIGN_OPTION
    : DEFAULT_REFRESH_TOKEN_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as Payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
