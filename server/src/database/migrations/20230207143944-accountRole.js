'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("AccountRole", {
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Account",
          key: 'id'
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Role",
          key: "id"
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("AccountRole")
  }
};
