import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post(
    "/upload",
    upload.single("image"),
    async (req, res) => {
        try {
            console.log("FILE:", req.file);

            // Check if image exists
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Please upload an image"
                });
            }

            // Upload buffer to Cloudinary
            const result = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "apnastay/test",
                        resource_type: "image"
                    },

                    (error, result) => {

                        if (error) {
                            console.log("CLOUDINARY ERROR:", error);
                            reject(error);
                        } else {
                            console.log("CLOUDINARY SUCCESS:", result);
                            resolve(result);
                        }

                    }
                );

                // Send Multer buffer to Cloudinary
                stream.end(req.file.buffer);

            });

            return res.status(200).json({
                success: true,
                message: "Image uploaded successfully",
                imageUrl: result.secure_url,
                publicId: result.public_id
            });

        } catch (error) {

            console.log("UPLOAD ERROR:", error);

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
);

export default router;