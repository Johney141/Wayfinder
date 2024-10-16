'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmarks.belongsTo(
        models.Articles,
        {foreignKey: 'articleId'}
      )

      Bookmarks.belongsTo(
        models.User,
        {foreignKey: 'userid'}
      )
    }
  }
  Bookmarks.init({
    articleId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Bookmarks',
  });
  return Bookmarks;
};