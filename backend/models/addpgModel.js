import mongoose from "mongoose";

const  addPgSchema=new mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner",
        required:true,
        index:true,
    },
    pgName:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    city:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    rentPerMonth:{
        type:Number,
        required:true,
        min:0
    },
     pgType:{
        type:String,
        enum:["Boys PG","Girls PG","Co-living"],
       required:true,
    },
    roomType:{
        type:String,
        enum:["Single seater","Double seater","Triple seater","Four seater"],
        required:true,
    },
    availability:{
        type:String,
        enum:["Available","Not Available"],
        required:true,
    },
     facilities: [
      {
        type: String,
        enum: [
          "AC",
          "Non-AC",
          "WiFi",
          "Food",
          "Parking",
          "Laundry",
          "Housekeeping",
          "Hot Water",
        ],
      },
    ],
    description:{
        type:String,
        required:true,
        maxLength:1000,
        trim:true,
    },
    images: [
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
]
},{timestamps: true});

const pgModel=mongoose.model("Pg",addPgSchema)

export default pgModel;