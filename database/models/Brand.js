module.exports = (sequelize, dataTypes) => {

    const alias = "Marca"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        marcas:{
            allowNull: false,
            type: dataTypes.STRING(45)
        },
        }
    const config = {      
            tableName: "Brand",
            timestamps: false      
        }
    
    const Product = sequelize.define(alias, cols, config);

    return Product;
}