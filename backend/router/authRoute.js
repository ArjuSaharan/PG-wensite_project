import express from 'express';
import auth from '../middleware/auth.js';
import userLoginModel from '../models/userLogin.js';
import ownerLModel from '../models/ownerLoginModel.js';
const router =express.Router();

router.get("/me", auth, async (req, res) => {

  try {
    console.log("ROLE:", req.role);
        console.log("USER ID:", req.userId);
        console.log("OWNER ID:", req.ownerId);
    if (req.role === "user") {
      const user = await userLoginModel
        .findById(req.userId)
        .select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.status(200).json({
        success: true,
        role: "user",
        user
      });
    }
    if (req.role === "owner") {

      const owner = await ownerLModel
        .findById(req.ownerId)
        .select("-password");

      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Owner not found"
        });
      }

      return res.status(200).json({
        success: true,
        role: "owner",
        owner
      });
    }


    return res.status(403).json({
      success: false,
      message: "Invalid role"
    });

  } catch (error) {

    console.log("AUTH ME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

export default router;