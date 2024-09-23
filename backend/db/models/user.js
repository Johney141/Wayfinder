'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false

    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true,
      }

    },
    hashedPassword: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60],
      },

    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false

    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};