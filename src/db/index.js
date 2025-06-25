import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async()=>{  //asycronus type method return promises like .then, .catch
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)   
       console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
       
    } catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1)
    }
}

export default connectDB