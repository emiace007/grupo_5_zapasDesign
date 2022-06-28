module.exports = (sequelize, dataTypes) => {

    const alias = "Product"
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
            tableName: "Product",
            timestamps: false      
        }
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Brand, { 
            as: "marca",
            foreignKey: "brand_id"
        })
    }

    return Product;
}