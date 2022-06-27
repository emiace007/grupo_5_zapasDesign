module.exports = (sequelize, dataTypes) => {

    const alias = "Producto"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        precio:{
            allowNull: false,
            type: dataTypes.INTEGER
        },
        nombre:{
            allowNull: false,
            type: dataTypes.STRING(45)
        },  
        imagen:{
            allowNull: false,
            type: dataTypes.STRING(45)
        }, 
        descripcion:{
            allowNull: false,
            type: dataTypes.STRING(100)
        }}
    const config = {      
            tableName: "product",
            timestamps: false      
        }
    
    const Product = sequelize.define(alias, cols, config);

    return Product;
}