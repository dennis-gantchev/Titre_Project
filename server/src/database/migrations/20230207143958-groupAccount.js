'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("GroupAccount", {
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Group",
          key: "id"
        }
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Account",
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
    await queryInterface.dropTable("GroupAccount")
  }
};
