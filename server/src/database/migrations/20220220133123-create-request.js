'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    resolved: {
      type: Sequelize.BOOLEAN
    },
    create_at: {
      type: Sequelize.DATE
    },
    update_at: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Requests');
}