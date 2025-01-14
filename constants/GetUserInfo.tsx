import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

if (!JWT_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

interface CustomJwtPayload extends JwtPayload {
    id: string;
}

export const getUserFromToken = (token?: string | null): CustomJwtPayload | null => {
    try {
        if (!token) {
            console.warn("Token is missing.");
            return null;
        }

        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

        const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET) as CustomJwtPayload;

        if (!decoded || !decoded.id) {
            console.warn("Invalid or incomplete token data.");
            return null;
        }

        return decoded;

    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            console.error("Token has expired:", error.message);
        } else if (error instanceof JsonWebTokenError) {
            console.error("Invalid token:", error.message);
        } else {
            console.error("Error verifying token:", error.message || error);
        }
        return null;
    }
};
