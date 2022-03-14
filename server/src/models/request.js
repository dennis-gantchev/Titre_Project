
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.hasOne(models.Account,{foreignKey:'id', sourceKey:"clientId"})
      Request.hasOne(models.Role,{as: 'role', foreignKey:'id', sourceKey:"roleId"})
      // Request.belongsTo(models.Account, {foreignKey:'clientId', as: 'client'})
      // Request.belongsTo(models.Account, {foreignKey:{name:'agentId', allowNull:true}, as:'agent'})
      // Request.belongsTo(models.Role, {foreignKey:'roleId', as: "role"})
    }
  }
  Request.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "Account",
        key: "id"
      }
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull : true,
      foreignKey: true,
      references: {
        model: "Account",
        key: "id"
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "Role",
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        notNull: true
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255],
        notNull: true
      }
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      }
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Request',
  });
  return Request;
};