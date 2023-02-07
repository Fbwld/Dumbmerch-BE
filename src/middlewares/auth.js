const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next)=>{
    const authHeader = req.header("Authorization")

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).send({
            message:"Access Denied!"
        })
    }
    try {
        const SECRET_KEY = process.env.TOKEN_KEY
        const verified = jwt.verify(token, SECRET_KEY)

        req.user = verified
        return next()
    } catch (error) {
        res.status(400).send({message:"invalid token"})
    }
    console.log(token)
}