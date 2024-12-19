'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tags.belongsToMany(
        models.Articles, 
        {
          through: 'ArticleTags', 
          foreignKey: 'tagId',
          otherKey: 'articleId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Tags.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};