'use strict';

const { Bcrypt } = require("../helpers");

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name can't be empty`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `username can't be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: {
          msg: `email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `password can't be empty`
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    balanceBtc: {
      type: DataTypes.DECIMAL,
    }
  }, { sequelize });
  User.addHook("beforeCreate", (user) => {
    user.password = Bcrypt.hash(user.password);
  });
  User.associate = function (models) {
    // associations can be defined here
    // User.belongsToMany(models.Company, {through:models.User_Stock})
    User.hasMany(models.User_Stock, {foreignKey: 'UserId'})
  };
  return User;
};