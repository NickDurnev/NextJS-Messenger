import * as jose from "jose";

interface Payload {
  id: string;
  email: string;
  name: string;
}

const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
const JWT_ISSUER = process.env.JWT_ISSUER;

const secret_key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

const DEFAULT_ACCESS_TOKEN_SIGN_OPTION = "3h"; // 3 hours

const DEFAULT_REFRESH_TOKEN_SIGN_OPTION = "7d"; // 7 days

const alg = "HS256";

export async function signJwtToken(payload: Payload, type: string) {
  const token = await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER!)
    .setAudience(JWT_AUDIENCE!)
    .setExpirationTime(
      type === "access"
        ? DEFAULT_ACCESS_TOKEN_SIGN_OPTION
        : DEFAULT_REFRESH_TOKEN_SIGN_OPTION
    )
    .sign(secret_key);
  return token;
}

export async function verifyJwt(token: string) {
  try {
    const decoded = await jose.jwtVerify(token, secret_key, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    return decoded.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
