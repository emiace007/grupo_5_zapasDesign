module.exports = (sequelize, dataTypes) => {

    const alias = "Size"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        talle:{
            allowNull: false,
            type: dataTypes.INTEGER
        },
        }
    const config = {      
            tableName: "Size",
            timestamps: false      
        }
    
    const Size = sequelize.define(alias, cols, config);

    Size.asociate = function (models)  {

        Size.belongsToMany(models.Product, {
            as: "talle",
            through: "product_size",
            foreignKey: "size_id",
            otherKey: "product_id",
            timestamps: false
            });
    }

    return Size;
}