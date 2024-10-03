'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Articles.belongsTo(
        models.Organization,
          {foreignKey: 'orgId'}
      )

      Articles.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )

      Articles.hasMany(
        models.Comments, 
        {foreignKey: 'articleId', onDelete: 'CASCADE'}
      )
    }
  }
  Articles.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};