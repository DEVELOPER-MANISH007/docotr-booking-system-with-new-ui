import jwt from 'jsonwebtoken'

// doctor authentication middleware

export const authDoctor = async (req,res,next) => {
    try {
        const {authorization} = req.headers
        if(!authorization){
            return res.json({success:false,message:'Not Authorized login again'})
        }
        const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : authorization
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body = req.body || {}
        req.body.docId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
 export default authDoctor