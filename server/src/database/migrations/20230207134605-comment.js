'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Comment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      requestId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: "Request",
            // model: {
            //   tableName: 'Request',
            //   // schema: 'schema'
            // },
            key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Comment")
  }
};
