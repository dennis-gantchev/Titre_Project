import { QueryInterface } from "sequelize/types";
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    client_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "Account",
        key: "id"
      }
    },
    agent_id: {
      type: Sequelize.INTEGER,
      allowNull : true,
      references: {
        model: "Account",
        key: "id"
      }
    },
    role_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "Role",
        key: "id"
      }
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