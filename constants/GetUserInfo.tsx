import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

if (!JWT_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

export const getUserFromToken = (token?: string | null): JwtPayload | null => {
    try {
        if (!token) {
            console.warn("Token is missing.");
            return null;
        }

        const tokenWithoutBearer = token.startsWith("Bearer ")
            ? token.slice(7)
            : token;

        const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET) as JwtPayload;

        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            console.warn("Invalid or incomplete token data.");
            return null;
        }

        return decoded;

    } catch (error: any) {
        console.error("Error verifying token:", error.message || error);
        return null;
    }
};