import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
    
}))   //.use use at the time of midaaleware or configration setteing

app.use(express.json({limit:"16kb"}))//for data from http body
app.use(express.urlencoded({extended:true, limit:"16kb"})) //for data from url //extended means object ke aandar object de sakte ho
app.use(express.static("public")) //file store in our servar itself //public is folder name
app.use(express.cookieParser())//for user browser cookie access and set besicaly CRUD opration perform //sccure cookie only read by server and remove by server itself

export {app}
