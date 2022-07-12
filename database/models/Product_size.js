module.exports = (sequelize, dataTypes) => {

    const alias = "Product_size"
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
        size_id: {
            type: dataTypes.INTEGER,
            references: {
              model: 'Size', 
              key: 'id'
            }
          }
    }
           
    const config = {      
            tableName: "Product_size",
            timestamps: false      
        }
    
    const Product_size = sequelize.define(alias, cols, config);

    return Product_size
}