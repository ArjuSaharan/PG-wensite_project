import jwt from "jsonwebtoken";
import ownerLModel from "../models/ownerLoginModel.js";

 const ownerAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Owner not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        if (decoded.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Owner access required"
            });
        }

        const owner = await ownerLModel.findById(decoded.id);

        if (!owner) {
            return res.status(403).json({
                success: false,
                message: "Owner not found"
            });
        }
        req.ownerId = owner._id;
        next();

    } catch (error) {
        console.log("OWNER AUTH ERROR:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default ownerAuth;