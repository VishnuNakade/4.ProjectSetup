import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true,
    },
    coverImages:{
        type:String, //cloudinary url
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type: String,
        required:[true,"Password is required"]
    },
    

},{timestamps:true})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})

//updateone, deleteone are the pre deffind methodes for schema

//how to create/add castam methodes in schema

userSchema.methods.isPasswordCorrect = async function name(password) {
   return await bcrypt.compare(password,this.password) //it's return true or false
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,  //ye chiz data base se aa rahi hai
            email: this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id,  //ye chiz data base se aa rahi hai
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User=mongoose.model("User",userSchema)