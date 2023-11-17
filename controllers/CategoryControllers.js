const Joi = require("joi");

const { Category } = require("../models/index.js");
const SendResponse = require("../helpers/SendResponse.js");

exports.getCategories = async (_, res) => {
  try {
    const categories = await Category.findAll({
      include: "inventoryCategory",
      order: [["updatedAt", "DESC"]],
    });
    return res.status(200).send(SendResponse(200, "Success", null, categories));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: "inventoryCategory",
    });

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category Not Found", null, null));
    }
    return res.status(200).send(SendResponse(200, "Success", null, category));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await Category.findOne({ where: { categoryName } });

    if (category) {
      return res.status(400).send(SendResponse(400, "Category Name is Already Used"));
    }

    const schema = Joi.object({
      categoryName: Joi.string().min(3).max(25).required(),
    });

    const { error } = schema.validate({ categoryName });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newCategory = await Category.create({ categoryName });
    return res.status(201).send(SendResponse(201, "Success Create Data", null, newCategory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category Not found", null, null));
    }

    if (categoryName !== category.categoryName) {
      const isCategoryNameExist = await Category.findOne({ where: { categoryName } });
      if (isCategoryNameExist) {
        return res.status(400).send(SendResponse(400, "Category Name already used", null, null));
      }
    }

    const schema = Joi.object({
      categoryName: Joi.string().min(3).max(25).required(),
    });

    const { error } = schema.validate({ categoryName });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newCategory = await category.update({ categoryName });
    return res.status(201).send(SendResponse(201, "Success Update Data", null, newCategory));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send(SendResponse(404, "Category Not found", null, null));
    }

    await category.destroy();
    return res.status(204).send(SendResponse(204, "Success Delete Category", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
