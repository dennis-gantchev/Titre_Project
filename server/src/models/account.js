import { Model, Sequelize, DataType } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Account.hasMany(models.Request)
      Account.hasMany(models.Request)
      Account.belongsToMany(models.Group, {through: "GroupAccount"})
      Account.belongsToMany(models.Role, {through: "AccountRole"})

    }
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isAlpha: true,
        len:[3,15],
        notNull: true
      }
    },
    lastName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isAlpha: true,
        len:[3,15],
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: true
      }
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
      validate: {
        isDate: true
      }
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Account',
  });
  return Account;
};