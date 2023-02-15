
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Role.hasMany(models.Request)
      Role.belongsTo(models.Group)
      Role.belongsToMany(models.Account, {through: "AccountRole"})
    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // groupId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   foreignKey: true,
    //   references: {
    //     model: "Group",
    //     key: "id"
    //   }
    // },
    name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate:{
        isAlpha: true,
        len:[3,15],
        notNull: true
      }
    },
    canInviteMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    canBanMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canAssignRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canCreateRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canEditGroupTicket: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canDeleteGroupTicket: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canAssignTicket: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canManageTicket: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canResolveTicket: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate:{
        isDate: true
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate:{
        isDate: true
      }
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Role',
  });
  return Role;
};