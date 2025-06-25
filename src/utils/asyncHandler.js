import { Promise } from "mongoose"

const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}



export {asyncHandler}


// asycHandlar is higher order function . higher order function thouse function can be accept the function as a parameter and also can return eg. Treat function as a parametar

// const asycHandlar=()=>{}
// const asycHandlar=(fun)=>()=>{}
// const asycHandlar=()=>async()=>{}

// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message: err.message
//         })
//     }
// }