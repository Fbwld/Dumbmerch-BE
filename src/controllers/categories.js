const {product, category, productcaegory}= require(`../../models`)


exports.addCategory= async(req,res)=>{
    try {
        console.log(req.body)
        const data = req.body;
        const newCategory = await category.create(data);
        // const categoryData = await category.findOne({
        //     where: {
        //     name: categoryName,
        //     },
        // });
    
        // if (categoryData) {
        //     await productcaegory.create({
        //     idCategory: categoryData.id,
        //     idProduct: newProduct.id,
        //     });
        // } else {
        //     const newCategory = await category.create({ name: categoryName });
        //     await productcaegory.create({
        //     idCategory: newCategory.id,
        //     idProduct: newProduct.id,
        //     });
        // }
        let productData = await category.findOne({
            where: {
            id: newCategory.id,
            },
            include: [
            {
                model: product,
                as: "products",
                through: {
                model: productcaegory,
                as: "bridge",
                attributes: [],
                },
                attributes: {
                exclude: ["createdAt", "updatedAt"],
                },
            },
            ],
            attributes: {
            exclude: ["createdAt", "updatedAt"],
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
exports.getCategories = async(req,res)=>{
    try {
        let data = await category.findAll({
            // include:[
            //     {
            //         model:product,
            //         as:"products",
            //         through:{
            //             model:productcaegory,
            //             as: "bridge",
            //             attributes:[],
            //         },
            //         attributes:{
            //             exclude:["createdAt","updatedAt"]
            //         }
            //     }
                
            // ],
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
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}
exports.getCategory = async(req,res)=>{
    try {
        const {id} = req.params

        let data = await category.findOne({
            where:{
                id:id
            },
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
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}
exports.updateCategory = async(req, res) => {
    try {
        const id = req.params.id
        const newData = req.body

        await category.update(newData, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update successfull for category with id: ${id}`,
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
exports.deleteCategory= async(req,res)=>{
    try {
        const {id} = req.params

        await category.destroy({
            where:{
                id
            }
        })
        res.send({
            status:'success',
            message:`Delete category id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:'failed',
            message:'server error'
        })
    }
}