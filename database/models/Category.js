module.exports = (sequelize, dataTypes) => {

    const alias = "Category"
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
    
    const Category = sequelize.define(alias, cols, config);

    Category.asociate = function (models) {
        Category.belongsToMany(models.Product, {
            as: "categorias",
            through: "product_category",
            foreignKey: "category_id",
            otherKey: "product_id",
            timestamps: false
            });
    }

    return Category;
}