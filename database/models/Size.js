module.exports = (sequelize, dataTypes) => {

    const alias = "Talle"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        marcas:{
            allowNull: false,
            type: dataTypes.INTEGER
        },
        }
    const config = {      
            tableName: "Size",
            timestamps: false      
        }
    
    const Product = sequelize.define(alias, cols, config);

    return Product;
}