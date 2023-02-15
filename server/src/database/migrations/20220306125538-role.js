
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    groupId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: "Group",
        // model: {
        //   tableName: 'Group',
        //   schema: 'schema'
        // },
        key: 'id'
      },
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    canInviteMember: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    canBanMember: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canAssignRole: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canCreateRole: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canEditGroupTicket: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canDeleteGroupTicket: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canAssignTicket: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canManageTicket: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    canResolveTicket: {
      type: Sequelize.BOOLEAN,
      allowNull: false
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
  await queryInterface.dropTable('Role');
}