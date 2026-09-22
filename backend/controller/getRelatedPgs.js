import pgModel from "../models/addpgModel.js";


export const getRelatedPgs=async(req,res)=>{
    try{
        const {id}=req.params;
        const selectedPg=await pgModel.findById(id);
        if(!selectedPg){
            return res.status(404).json({success:false,message:"PG not found"})
        }
        const relatedPgs=await pgModel.find({
            _id: {$ne:id},
            $or:[
                {
                    pgType:selectedPg.pgType,
                },
                {
                    city:selectedPg.city,
                },
                {
                    rentPerMonth:{
                        $gte:selectedPg.rentPerMonth,
                        $lte:selectedPg.rentPerMonth
                    }
                }
            ]
        }).limit(6);
        return res.status(200).json({
            success:true,
            count:relatedPgs.length,
            pgs:relatedPgs
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}