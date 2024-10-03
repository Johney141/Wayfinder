'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.hasMany(
        models.User, 
        {foreignKey: 'orgId', onDelete: 'CASCADE'}
      )

      Organization.hasMany(
        models.Articles, 
        {foreignKey: 'orgId', onDelete: 'CASCADE'}
      )
    }
  }
  Organization.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};