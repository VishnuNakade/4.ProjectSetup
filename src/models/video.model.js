import mongoose, {Schema} from "mongoose"; //moongues se schms bhi extract kar lete hai
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; //is one of plugin for write advance quaryes


const videoSchema=new Schema({
    videoFile:{
        type:String, //cloudinary url
        required:true
    },
    thambnail:{
        type:String, //cloudinary url
        required:true
    },
    title:{
        type:String, 
        required:true
    },
    description:{
        type:String, 
        required:true
    },
    duration:{
        type:Number, //from cloudinary
        required:true
    },
    view:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

    
},{timeseries:true})

videoSchema.plugin(mongooseAggregatePaginate) //add plugins

export const Video=mongoose.model("Video",videoSchema)