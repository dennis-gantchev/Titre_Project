'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Document", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          // model: {
          //   tableName: 'Request',
          //   schema: 'schema'
          // },
          model: 'Request',
          key: 'id'
        },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      path: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      size: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(30),
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
    await queryInterface.dropTable("Document")
  }
};
