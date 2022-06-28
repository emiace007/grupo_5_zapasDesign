module.exports = (sequelize, dataTypes) => {

    const alias = "Brand"
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
    
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, { 
            as: "productos",
            foreignKey: "brand_id"
        })
    }

    return Brand;
}