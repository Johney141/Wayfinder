'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reactions.belongsTo(
        models.Articles,
        {foreignKey: 'articleId'}
      )

      Reactions.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
    }
  }
  Reactions.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        isLikeOrDislike(value) {
          if(value !== 'like' && value !== 'dislike') {
            throw new Error('Type must be like or dislike')
          }
        }
      }
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles'
      },
      onDelete: 'cascade'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reactions',
    references: {
      model: 'Users'
    },
    onDelete: 'cascade'
  });
  return Reactions;
};