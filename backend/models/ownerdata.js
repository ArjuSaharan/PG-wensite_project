import ownerLModel from "./ownerLoginModel.js";

export const getownerdata=async(req,res)=>{
    try{
         const user=await ownerLModel.findById(req.userId);
        if(!user){
            return res.json({success:false,message:"uer not found"});
        }
        return res.json({success:true,ownerData:{
            name:user.name,
            email:user.email,
            phone:user.phone,
        }})
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}