
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Request', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "Account",
        key: "id"
      }
    },
    agentId: {
      type: Sequelize.INTEGER,
      allowNull : true,
      foreignKey: true,
      references: {
        model: "Account",
        key: "id"
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
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    resolved: {
      type: Sequelize.BOOLEAN
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
  await queryInterface.dropTable('Request');
}