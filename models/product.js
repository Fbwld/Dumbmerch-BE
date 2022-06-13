'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      product.belongsTo(models.user, {
        as  : 'user',
        foreignKey : 'idUser'
      });

      product.belongsToMany(models.category, {
        as          : 'categories',
        through     : {
          model : 'productcaegory',
          as    : 'bridge'
        },
        foreignKey  : {
          name  : 'idProduct'
        }
      });

    }
  }
  product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    iamge: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};