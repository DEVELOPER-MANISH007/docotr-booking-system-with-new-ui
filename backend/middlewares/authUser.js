import jwt from 'jsonwebtoken';

// user authentication middleware

const authUser = async (req,res,next) => {
try {
    const {authorization} = req.headers
    if(!authorization){
        return res.json({success:false,message:'Not Authorized login again'})
    }
    
    // Extract token from "Bearer <token>"
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : authorization
    
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)

    req.body = req.body || {}
    req.body.userId = token_decode.id

    next()
} catch (error) {
    return res.json({success:false,message:error.message})
}
}

export default authUser;