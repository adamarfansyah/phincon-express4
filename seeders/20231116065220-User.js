"use strict";

const { PasswordHashing } = require("../helpers/PasswordHelpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "SuperAdmin",
          email: "superadmin123@mail.com",
          roleId: 1,
          password: await PasswordHashing("superadmin123"),
          accessToken: "",
        },
        {
          fullName: "employee",
          email: "employee123@mail.com",
          roleId: 2,
          password: await PasswordHashing("employee123"),
          accessToken: "",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
