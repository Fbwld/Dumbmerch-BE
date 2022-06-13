const {user}= require ('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
require("dotenv").config()

exports.register = async(req,res) =>{
    try {
        const data = req.body
        //blueprint
        
        const schema = Joi.object({
            name:Joi.string().min(5).required(),
            email:Joi.string().email().min(6).required(),
            password:Joi.string().min(4).required(),
            status: Joi.string()
        })
        const{error}= schema.validate(data)
        if (error){
            return res.status(400).send({
                status: "error",
                message:error.details[0].message
            })
        }
        //bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await user.create({
            name:data.name,
            email:data.email,
            password:hashedPassword,
            status:"customer"
        })
        res.status(200).send({
            status:"success",
            data:{
                user:{
                    name: newUser.name,
                    email:newUser.email
                }
            }
        })
    } catch (error) {
    res.send({
        status: "Failed",
        message: "Server Error"
    })
        
    }
}
exports.login = async(req,res)=>{
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(4).required()
    })
    const {error} = schema.validate(req.body)

    if (error)
    return res.status(400).send({
        error:{
            message: error.details[0].message
        }
    })
    try {
        const userExist = await user.findOne({
            where:{
                email:req.body.email
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })
        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if(!isValid){
            return res.status(400).send({
                status:"failed",
                message:"credential is invaid"
            })
        }
        const dataToken = {
            id:userExist.id
        }
        const SECRET_KEY =process.env.TOKEN_KEY
        const token = jwt.sign(dataToken,SECRET_KEY)
        res.status(200).send({
            status:"success",
            data:{
                user:{
                    id:userExist.id,
                    name:userExist.name,
                    email:userExist.email,
                    status:userExist.status,
                    token
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            status:"error",
            message:error.message
        })
    }
    
}
exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
        },
        });

        if (!dataUser) {
        return res.status(404).send({
            status: "failed",
        });
        }

        res.send({
        status: "success...",
        data: {
            user: {
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            status: dataUser.status,
            },
        },
        });
    } catch (error) {
        console.log(error);
        res.status({
        status: "failed",
        message: "Server Error",
        });
    }
}