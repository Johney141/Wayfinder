'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleTags.init({
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Articles'
      },
      onDelete: 'cascade'
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tags'
      },
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'ArticleTags',
  });
  return ArticleTags;
};