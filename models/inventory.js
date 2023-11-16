"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.belongsTo(models.Category, { as: "inventoryCategory", foreignKey: "categoryId" });
    }
  }
  Inventory.init(
    {
      name: DataTypes.STRING,
      count: DataTypes.INTEGER,
      description: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
