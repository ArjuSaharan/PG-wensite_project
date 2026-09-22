import pgModel from "../models/addpgModel.js";
import cloudinary from "../config/cloudinary.js";
import router from "../router/pgRoutes.js";

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "apnastay/pg",
                resource_type: "image"
            },
            (error, result) => {

                if (error) {
                    console.log("CLOUDINARY ERROR:");
                    console.log(error);

                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};


export const addPgData = async (req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        if (!req.ownerId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!req.files || req.files.length < 4) {
            return res.status(400).json({
                success: false,
                message: "At least 4 images are required"
            });
        }
        if (req.files.length > 6) {
            return res.status(400).json({
                success: false,
                message: "Maximum 6 images are allowed"
            });
        }
        const {
            pgName,
            address,
            city,
            rentPerMonth,
            pgType,
            roomType,
            availability,
            facilities,
            foodIncluded,
            description
        } = req.body;
        // Upload images
        const uploadedImages = [];
        for (const file of req.files) {
            console.log(
                "Uploading:",
                file.originalname,
                file.mimetype,
                file.size
            );

            const result = await uploadToCloudinary(file.buffer);

            uploadedImages.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        // Save PG
        const pg = await pgModel.create({

            ownerId: req.ownerId,
            pgName,
            address,
            city,
            rentPerMonth,
            pgType,
            roomType,
            availability,
            facilities: Array.isArray(facilities)
                ? facilities
                : facilities
                    ? [facilities]
                    : [],
            description,
            images: uploadedImages
        });


        return res.status(201).json({
            success: true,
            message: "PG added successfully",
            pg
        });
    } catch (error) {
        console.log("ADD PG ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// get pg fro update
export const getPgforEdit=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(req.ownerId);

        const pg=await pgModel.findOne({
            _id:id,
            ownerId:req.ownerId,
        })
        if(!pg){
            return res.status(404).json({
                success:false,
                message:"PG not found or you are not authorized"
            })
        }
        return res.status(200).json({
            success:true,
            pg,
        })
    }
    catch(error){
        console.log("GET EDIT PG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// edit pg from data
export const editData=async(req,res)=>{
    try{
        const pgId=req.params.id;
        const pg=await pgModel.findById(pgId);

        if(!pg){
            return res.status(404).json({success:false,message:"pg not found"});
        }
          if (pg.ownerId.toString() !== req.ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to edit this PG"
            })
        }
        pg.pgName = req.body.pgName;
        pg.address = req.body.address;
        pg.city = req.body.city;
        pg.rentPerMonth = req.body.rentPerMonth;
        pg.pgType = req.body.pgType;
        pg.roomType = req.body.roomType;
        pg.availability = req.body.availability;
        pg.facilities = req.body.facilities;
        pg.foodIncluded = req.body.foodIncluded;
        pg.description = req.body.description;

        const updatedPg = await pg.save();
        return res.status(200).json({
            success: true,
            message: "PG updated successfully",
            pg: updatedPg
        });
    }
    catch(error){
        console.log("UPDATE PG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// deleet pg details
export const deletePg=async (req,res)=>{
    try{
        const pgId=req.params.id;
        const pg=await pgModel.findById(pgId);
        if(!pg){
            return res.status(404).json({success:false,message:"pg not found"});
        }

        if(pg.ownerId.toString() !== req.ownerId.toString()){
            return res.status(403).json({
                success:false,
                message:"you are not allowed to delete this pg"
            })
        }
        await pgModel.findByIdAndDelete(pgId);
        return res.status(200).json({success:true, message:"pg delted successfully"});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// get specfic owner pgs
export const getPgs=async (req,res)=>{
    try{
        const pgs=await pgModel.find({
        ownerId:req.ownerId
    }).sort({createdAt:-1});

    return res.status(200).json({success:true,
        message:"pg listed successfully",
        pgs
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// get allpgs for user list
export const getAllPgs=async(req,res)=>{
    try{
        const pgs=await pgModel.find({}).sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            message:"All pgs feteched successfully",
            count:pgs.length,
            pgs
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


