'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlistok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wishlistok.belongsTo(models.product, {
        as: "products",
        foreignKey: {
          name: "idProduct",
        },
      });
      wishlistok.belongsTo(models.user, {
        as  : 'user',
        foreignKey : 'idUser'
      });
    }
  }
  wishlistok.init({
    idProduct: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'wishlistok',
  });
  return wishlistok;
};