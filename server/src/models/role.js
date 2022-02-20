
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate:{
        isAlpha: true,
        len:[3,15],
        notNull: true
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate:{
        isNumeric: true,
        isIn: [[1, 2, 3]],
        notNull: true
      }
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate:{
        isDate: true
      }
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate:{
        isDate: true
      }
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};