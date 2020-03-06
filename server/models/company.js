'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Company extends Model{}

  Company.init({
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    price: DataTypes.FLOAT,
    changes: DataTypes.STRING
  }, {sequelize})

  Company.associate = function(models) {
    Company.hasMany(models.User_Stock, {foreignKey: 'UserId'})
  };
  return Company;
};