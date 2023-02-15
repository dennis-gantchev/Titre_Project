import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Document extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Document.belongsTo(models.Request, {foreignKey: {allowNull:false}})
            // Request.hasOne(models.Account,{foreignKey:'id', sourceKey:"clientId"})
            // Request.hasOne(models.Role,{as: 'role', foreignKey:'id', sourceKey:"roleId"})
            // Request.belongsTo(models.Account, {foreignKey:'clientId', as: 'client'})
            // Request.belongsTo(models.Account, {foreignKey:{name:'agentId', allowNull:true}, as:'agent'})
            // Request.belongsTo(models.Role, {foreignKey:'roleId', as: "role"})
        }
    }
    Document.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        size: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(30),
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
        modelName: 'Document',
    });
    return Document;
};