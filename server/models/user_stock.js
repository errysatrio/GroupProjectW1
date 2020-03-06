'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User_Stock extends Model { }
  User_Stock.init({
    UserId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {sequelize});
  User_Stock.associate = function (models) {
    // associations can be defined here
    User_Stock.belongsTo(models.User, {foreignKey: 'UserId'})
    User_Stock.belongsTo(models.Company, {foreignKey: 'StockId'})
  };
  return User_Stock;
};