module.exports = (sequelize, dataTypes) => {

    const alias = "Product_category"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER,
            references: {
              model: 'Product', 
              key: 'id'
            }
        },
        category_id: {
            type: dataTypes.INTEGER,
            references: {
              model: 'Category', 
              key: 'id'
            }
          }
    }
           
    const config = {      
            tableName: "Product_category",
            timestamps: false      
        }
    
    const Product_category = sequelize.define(alias, cols, config);

    return Product_category 
}

