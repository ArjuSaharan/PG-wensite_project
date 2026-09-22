import pgModel from "../models/addpgModel.js";



export const filterPgs=async(req,res)=>{
    const {gender,roomType,facilities,minprice,maxprice}=req.query;
    try{
        const query={};
        if(gender){
            if(gender==="Boys"){
                query.pgType= "Boys PG";
            }
            if(gender==="Girls"){
                query.pgType = "Girls PG";
            }
            if(gender==="co-living"){
                query.pgType ="Co-living"
            }
        }

        if(roomType){
            const roomTypes=roomType.split(",");
            query.roomType={$in : roomTypes};
        }
        if(facilities){
            const facility=facilities.split(",");
            query.facilities={$all : facility};
        }
        if(minprice || maxprice){
            query.rentPerMonth ={};
            if(minprice){
                query.rentPerMonth.$gte=Number(minprice);
            }
            if(maxprice){
                query.rentPerMonth.$lte =Number(maxprice);
            }
        }
        const pgs=await pgModel.find(query).sort({createdAt:-1});
        return res.status(200).json({success:true,
            count:pgs.length,
            pgs
        });

    }
    catch(error){
        return res.json({sucess:false,message:error.message});
    }
}