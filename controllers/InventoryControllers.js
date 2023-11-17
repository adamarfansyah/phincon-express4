const Joi = require("joi");
const { Op } = require("sequelize");

const { Inventory, Category } = require("../models/index.js");
const SendResponse = require("../helpers/SendResponse.js");
const UploadToImgbb = require("../helpers/UploadToImgbb.js");

exports.getInventories = async (_, res) => {
  try {
    const inventories = await Inventory.findAll({
      include: { model: Category, as: "inventoryCategory", attributes: ["id", "categoryName"] },
      attributes: ["id", "name", "count", "description", "categoryId"],
      order: [["updatedAt", "DESC"]],
    });
    return res.status(200).send(SendResponse(200, "Success", null, inventories));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getInventory = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (!identifier) {
      return res.status(400).json({ message: "Bad Request: ID or email is missing" });
    }

    const inventory = await Inventory.findOne({
      where: {
        [Op.or]: [{ id: identifier }, { name: identifier }],
      },
      include: { model: Category, as: "inventoryCategory", attributes: ["id", "categoryName"] },
      attributes: ["id", "name", "count", "description", "categoryId"],
    });

    if (!inventory) {
      return res.status(404).send(SendResponse(404, "Inventory Not Found", null, null));
    }

    return res.status(200).send(SendResponse(200, "Success", null, inventory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createInventory = async (req, res) => {
  try {
    const { name, count, description, categoryId } = req.body;
    const { image } = req.files;

    const imageUrl = await UploadToImgbb(image);
    const isInventoryExist = await Inventory.findOne({ where: { name } });
    const isCategoryExist = await Category.findByPk(categoryId);

    if (isInventoryExist) {
      return res.status(400).send(SendResponse(400, "Inventory Name already used", null, null));
    }

    if (!isCategoryExist) {
      return res.status(404).send(SendResponse(404, "Category Not Found", null, null));
    }

    const schema = Joi.object({
      name: Joi.string().required(),
      count: Joi.number().required(),
      description: Joi.string().min(5).max(100).required(),
      imageUrl: Joi.string().required(),
      categoryId: Joi.number().required(),
    });

    const newInventory = { name, count, description, categoryId, imageUrl };

    const { error } = schema.validate(newInventory);

    if (error && error.details[0].path[0] === "image" && error.details[0].type === "binary.max") {
      return res.status(400).send(SendResponse(400, "Image size exceeds the limit.", null, null));
    }

    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    await Inventory.create(newInventory);
    return res.status(201).send(SendResponse(201, "Success Create Inventory", null, newInventory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateInventoryProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;
    const { image } = req.files;

    const inventory = await Inventory.findByPk(id);
    const category = await Category.findByPk(categoryId);

    if (!inventory) {
      return res.status(404).send(SendResponse(404, "Inventory Not Found", null, null));
    }

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category Not Found", null, null));
    }

    if (inventory.name !== name) {
      const inventoryWithSameName = await Inventory.findOne({ where: { name } });
      if (inventoryWithSameName) {
        return res.status(400).send(SendResponse(400, "Inventory Name Already Exist"));
      }
    }

    const imageUrl = await UploadToImgbb(image);

    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().min(5).max(100).required(),
      imageUrl: Joi.string().required(),
      categoryId: Joi.number().required(),
    });

    const updatedInventory = { name, description, categoryId, imageUrl };
    const { error } = schema.validate(updatedInventory);
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newInventory = await inventory.update(updatedInventory);
    return res.status(201).send(SendResponse(201, "Success Update", null, newInventory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateInventoryCount = async (req, res) => {
  try {
    const { id } = req.params;
    const { count, isPurchase } = req.body;
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).send(SendResponse(404, "Inventory Not Found", null, null));
    }

    if (!isPurchase) {
      const hasUpdateInventoryCount = await inventory.update({ count });
      return res
        .status(201)
        .send(SendResponse(201, "Success Update Count", null, hasUpdateInventoryCount));
    }

    if (count > inventory.count) {
      return res.status(400).send(SendResponse(400, "Inventory has no more count", null, null));
    }

    const updatedInventory = await inventory.update({ count: inventory.count - count });
    return res
      .status(200)
      .send(SendResponse(200, "Inventory Count Updated", null, updatedInventory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).send(SendResponse(404, "Inventory Not Found", null, null));
    }

    await inventory.destroy();
    return res.status(204).send(SendResponse(204, "Success Delete", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
