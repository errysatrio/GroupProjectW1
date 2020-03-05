'use strict';
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
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        },
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name can't be empty`
        }
      }
    },
  }, { sequelize });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};