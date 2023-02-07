const {user,product,wishlistok}= require(`../../models`)

exports.getWishLists = async(req,res)=>{
    try {
        const data = await wishlistok.findAll({
            include: [
                {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password","status"],
                },
                },
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    },
            ],
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        res.send({
            status:"success",
            data:{
                user:{
                    data
                }
            }
        })
    } catch (error) {
        res.send({
            status:"error",
            message:error.message
        })
    }
}


    exports.deleteWishList= async(req,res)=>{
        try {
            const {id} = req.params
    
            await wishlistok.destroy({
                where:{
                    id
                }
            })
            res.send({
                status:'success',
                message:`Delete product id:${id} finished`
            })
        } catch (error) {
            res.send({
                status:'failed',
                message:'server error'
            })
        }
    }

exports.getWishList = async(req,res)=>{
    try {
        const {id} = req.params
        const data = await wishlistok.findOne({
            where:{
                idUser:id
            },
                include: [
                    {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password","status"],
                    },
                    },
                    {
                        model: product,
                        as: "products",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                        },                ],
                attributes:{
                    exclude:['createdAt','updatedAt']
                }
            })
        res.send({
            status:"success",
            data:{
                user:{
                    data
                }
            }
        })
    } catch (error) {
        res.send({
            status:"error",
            message:error.message
        })
    }
}

exports.addWhisList = async(req,res)=>{
    try{
        console.log(req.body,"ini console")
        const data={
            idProduct:req.body.idProduct,
            idUser:req.user.id,
        };

        const createdData = await wishlistok.create(data);

        let whis = await wishlistok.findOne({
            where: {
                id: createdData.id,
            },
            include: [
                {
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
                },
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                    },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            });
           
        res.send({
            status:"success",
            data:{
                user:{
                whis
                }
            }
        })
    }catch(error){
        res.send({
            status:"error",
            message:error.message
        })
    }
}
    