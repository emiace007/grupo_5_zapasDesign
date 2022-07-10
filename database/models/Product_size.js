module.exports = (sequelize, dataTypes) => {

    const alias = "Product_size"
    const cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        }
    }
    
    const Product_size = sequelize.define(alias, cols,  { timestamps: false });

    return Product_size;
}
    
