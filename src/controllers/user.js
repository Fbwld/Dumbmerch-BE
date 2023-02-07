const {user}= require(`../../models`)

exports.addUser = async(req,res)=>{
    try{
        const data = req.body

        const createdData = await user.create(data)

        res.send({
            status:"success",
            data:{
                user:{
                createdData
                }
            }
        })
    }catch(error){
        res.send({
            status:"error",
            message:"server error"
        })
    }
}
exports.getUsers = async(req,res)=>{
    try {
        const users = await user.findAll({
            include:[
                {
                    model:user,
                    as:"user",
                    attributes:{
                        exclude:["createdAt","updatedAt","password","status"],
                    },
                },
            ],
            attributes:{
                exclude:['password','createdAt','updatedAt']
            }
        })
        res.send({
            status:"success",
            data:{
                user:{
                    users
                }
            }
        })
    } catch (error) {
        res.send({
            status:"error",
            message:"server error"
        })
    }
}
exports.getUser = async(req,res)=>{
    try {
        const {id} = req.params

        const datauser = await user.findOne({
            where:{
                id:id
            },
            attributes:{
                exclude:['password','createdAt','updatedAt']
            }
        })
        res.send({
            status:"success",
            data:{
                datauser
            }
        })
    } catch (error) {
        res.send({
            status:"error",
            message:"server error"
        })
    }
}
exports.updateUser = async(req, res) => {
    try {
        const id = req.params.id
        const newData = req.body

        await user.update(newData, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update successfull for user with id: ${id}`,
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
exports.deleteUser = async(req,res)=>{
    try {
        const {id} = req.params

        await user.destroy({
            where:{
                id
            }
        })
        res.send({
            status:'success',
            message:`Delete user id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:'failed',
            message:'server error'
        })
    }
}
