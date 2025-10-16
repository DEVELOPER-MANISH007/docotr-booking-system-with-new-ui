import jwt from 'jsonwebtoken';

// admin authentication middleware

const authAdmin = async (req,res,next) => {
try {
    const {authorization} = req.headers
    if(!authorization){
        return res.json({success:false,message:'Not Authorized login again'})
    }
    
    // Extract token from "Bearer <token>"
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : authorization
    
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)

    // Check if the decoded token contains the admin email
    if(token_decode.email !== process.env.ADMIN_EMAIL){
      return res.json({success:false,message:'Not Authorized login again'})
    }

    next()
} catch (error) {
    return res.json({success:false,message:error.message})
}
}

export default authAdmin;