import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
    try {
        console.log("AUTH COOKIES:", req.cookies);

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED TOKEN:", decoded);

        req.role = decoded.role;

        if (decoded.role === "user") {
            req.userId = decoded.id;
        }
        else if (decoded.role === "owner") {
            req.ownerId = decoded.id;
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Invalid role"
            });
        }

        console.log("REQ USER ID:", req.userId);
        console.log("REQ OWNER ID:", req.ownerId);

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Token expired or invalid"
        });
    }
};

export default auth;