import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Request.hasOne(models.Account,{foreignKey:'id', sourceKey:"clientId"})
            // Request.hasOne(models.Role,{as: 'role', foreignKey:'id', sourceKey:"roleId"})
            // Request.belongsTo(models.Account, {foreignKey:'clientId', as: 'client'})
            // Request.belongsTo(models.Account, {foreignKey:{name:'agentId', allowNull:true}, as:'agent'})
            // Request.belongsTo(models.Role, {foreignKey:'roleId', as: "role"})
            Group.belongsToMany(models.Account, {through: "GroupAccount"})
            Group.hasMany(models.Role)
            Group.hasMany(models.Request)
        }
    }
    Group.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50],
                notNull: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
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
        modelName: 'Group',
    });
    return Group;
};