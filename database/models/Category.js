module.exports = (sequelize, dataTypes) => {

    const alias = "Categoria"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        categoria:{
            allowNull: false,
            type: dataTypes.STRING(45)
        },
        }
    const config = {      
            tableName: "Category",
            timestamps: false      
        }
    
    const Product = sequelize.define(alias, cols, config);

    return Product;
}