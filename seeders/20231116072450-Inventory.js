"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Inventories",
      [
        {
          name: "Laptop Lenovo M1",
          count: 10,
          description: "Laptop Lenovo M1 100",
          imageUrl: "https://unsplash.com/photos/macbook-pro-on-top-of-brown-table-1SAnrIxw5OY",
          categoryId: 1,
        },
        {
          name: "Boxer",
          count: 10,
          description: "Celana Boxer anti bolong",
          imageUrl:
            "https://unsplash.com/photos/a-close-up-of-a-person-wearing-blue-gloves-hFnsuRCJ_3A",
          categoryId: 2,
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
    await queryInterface.bulkDelete("Inventories", null, {});
  },
};
