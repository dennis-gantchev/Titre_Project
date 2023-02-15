import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.Request)
            Comment.belongsTo(models.Account)
            // Request.hasOne(models.Account,{foreignKey:'id', sourceKey:"clientId"})
            // Request.hasOne(models.Role,{as: 'role', foreignKey:'id', sourceKey:"roleId"})
            // Request.belongsTo(models.Account, {foreignKey:'clientId', as: 'client'})
            // Request.belongsTo(models.Account, {foreignKey:{name:'agentId', allowNull:true}, as:'agent'})
            // Request.belongsTo(models.Role, {foreignKey:'roleId', as: "role"})
        }
    }
    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        // rquestId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     foreignKey: true,
        //     references: {
        //         model: "Request",
        //         key: "id"
        //     }
        // },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                len: [3, 50],
                notNull: true
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
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
        modelName: 'Comment',
    });
    return Comment;
};