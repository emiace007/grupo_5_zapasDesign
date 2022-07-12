module.exports = (sequelize, dataTypes) => {

    const alias = "Product_category"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        }
    }
    
    const Product_category = sequelize.define(alias, cols,  { tableName: "Product_category", timestamps: false });

    return Product_category;
}
    
