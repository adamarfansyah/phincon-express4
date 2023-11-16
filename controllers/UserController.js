const Joi = require("joi");
const SendResponse = require("../helpers/SendResponse.js");
const { Op } = require("sequelize");

const { User, Role } = require("../models/index.js");
const { GenerateToken } = require("../helpers/GenerateToken.js");
const { PasswordHashing, PasswordCompare } = require("../helpers/PasswordHelpers.js");

exports.getUsers = async (_, res) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "fullName", "email"],
      include: "userRole",
      order: [["updatedAt", "DESC"]],
    });
    return res.status(200).send(SendResponse(200, "Success", null, user));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.getUser = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (!identifier) {
      return res.status(400).json({ message: "Bad Request: ID or email is missing" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ id: identifier }, { email: identifier }],
      },
      attributes: ["id", "fullName", "email"],
      include: "userRole",
    });

    if (!user) return res.status(404).send(SendResponse(404, "User Not Found", null, null));

    return res.status(200).send(SendResponse(200, "Success", null, user));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, roleId, password, confirmPassword } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ fullName }, { email }],
      },
    });

    if (user) {
      return res.status(400).send(SendResponse(400, "User Already Exist", null, null));
    }

    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
        .required(),
      roleId: Joi.number().max(3),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = schema.validate({ fullName, email, roleId, password, confirmPassword });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const passwordHashed = await PasswordHashing(password);

    const newUser = await User.create({ fullName, email, roleId, password: passwordHashed });
    return res.status(201).send(SendResponse(201, "Success Create User", null, newUser));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }

    if (fullName !== user.fullName) {
      const userWithSameName = await User.findOne({ where: { fullName } });
      if (userWithSameName) {
        return res.status(400).send(SendResponse(400, "Full name is already in use", null, null));
      }
    }

    if (email !== user.email) {
      const userWithSameEmail = await User.findOne({ where: { email } });
      if (userWithSameEmail) {
        return res.status(400).send(SendResponse(400, "Email is already in use", null, null));
      }
    }

    const schema = Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
        .required(),
    });

    const { error } = schema.validate({ fullName, email });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newUser = await user.update({ fullName, email });
    return res.status(201).send(SendResponse(201, "Success Create User", null, newUser));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;

    const user = await User.findByPk(id);
    const role = await Role.findByPk(roleId);
    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }
    if (!role) {
      return res.status(404).send(SendResponse(404, "Role Not Found", null, null));
    }

    const schema = Joi.object({
      roleId: Joi.number().required(),
    });

    const { error } = schema.validate({ roleId });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const newRoleUser = await user.update({ roleId });
    return res.status(200).send(SendResponse(200, "Success Update Role User", null, newRoleUser));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }

    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = schema.validate({ password, confirmPassword });
    if (error) {
      return res.status(400).send(SendResponse(400, error.details[0].message, null, null));
    }

    const passwordHashed = await PasswordHashing(password);

    const newUserPassword = await user.update({ password: passwordHashed });
    return res
      .status(201)
      .send(SendResponse(201, "Success Update Password", null, newUserPassword));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send(SendResponse(404, "User Not Found", null, null));
    }

    await user.destroy();
    return res.status(204).send(SendResponse(204, "Success Delete Data", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send(SendResponse(401, "Unauthorized", null, null));
    }

    const passwordCompared = await PasswordCompare(password, user.password);

    if (!passwordCompared) {
      return res.status(400).send(SendResponse(400, "Password is not same", null, null));
    }

    const dataUser = {
      id: user.id,
      fullName: user.fullname,
      email: user.email,
      roleId: user.roleId,
    };

    const { refreshToken } = GenerateToken(dataUser);

    user.accessToken = refreshToken;

    await user.save();

    res.cookie("authToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send(SendResponse(200, "Success Login", null, user));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken");
    return res.status(204).send(SendResponse(204, "Success Logout User", null, null));
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};
