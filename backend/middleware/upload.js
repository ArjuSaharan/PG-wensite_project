import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },

    fileFilter: (req, file, cb) => {

        console.log("FILE NAME:", file.originalname);
        console.log("MIME TYPE:", file.mimetype);

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            console.log("IMAGE ACCEPTED ✅");
            cb(null, true);
        } else {
            console.log("IMAGE REJECTED ❌");
            cb(new Error("Only JPG, PNG and WEBP images are allowed"));
        }
    }
});

export default upload;