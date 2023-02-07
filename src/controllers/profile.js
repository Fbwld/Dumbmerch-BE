const {profile,user}= require(`../../models`)

exports.updateProfile = async(req, res) => {
    try {
        const id = req.params.id
        const newData = JSON.parse(req.body.body)
        console.log(newData,"aku data")
        console.log(id,"aku id")
        await profile.update(newData, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update successfull for profile with id: ${id}`,
            data: newData
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
exports.deleteProfile= async(req,res)=>{
    try {
        const {id} = req.params

        await profile.destroy({
            where:{
                id
            }
        })
        res.send({
            status:'success',
            message:`Delete profile id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:'failed',
            message:'server error'
        })
    }
}
exports.getProfiles = async(req,res)=>{
    try {
        let data = await profile.findAll({
            include:[
                {
                    model:user,
                    as:"user",
                    attributes:{
                        exclude:["createdAt","updatedAt","password","name","email","status"],
                    },
                },
            ],
            attributes:{
                exclude:['idUser','createdAt','updatedAt']
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
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}
exports.getProfile = async(req,res)=>{
    
    try {
        const id = req.params.id
        let data = await profile.findOne({
            include:[
                {
                    model:user,
                    as:"user",
                    attributes:{
                        exclude:["createdAt","updatedAt","password","name","email","status"],
                    },
                },
            ],
            attributes:{
                exclude:['idUser','createdAt','updatedAt']
            },
            where : {
                idUser:id
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
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}
exports.addProfile= async(req,res)=>{
    try {
        const { category: categoryName, ...data } = req.body;
        const newProfile = await profile.create(data);

        const productData = await profile.findOne({
            where: {
            id: newProfile.id,
            },
            include: [
            {
                model: user,
                as: "user",
                attributes: {
                exclude: ["createdAt", "updatedAt", "password","email","status"],
                },
            },
            ],
            attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });
        res.send({
            status: "success...",
            data: productData,
        });
        } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: error.message
        });
        }
    };