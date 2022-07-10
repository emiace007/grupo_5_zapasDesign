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
        },
        brand_id: dataTypes.INTEGER
    }
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

        Product.belongsToMany(models.Category, {
            as: "categorias",
            through: "product_category",
            foreignKey: "product_id",
            otherKey: "category_id",
            timestamps: false
            });
        
        Product.belongsToMany(models.Size, {
            as: "talle",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
            });
    }



    return Product;
}