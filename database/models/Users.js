module.exports = (sequelize,dataTypes) => {
    let alias = "Users"
    let cols = {
        id:{
            autoIncrement: true, 
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre:{
            allowNull: false,
            type: dataTypes.STRING(45)
        },  
        apellido:{
            allowNull: false,
            type: dataTypes.STRING(45)
        },  
        email:{
            allowNull: false,
            type: dataTypes.STRING(45)
        },  
        password:{
            allowNull: false,
            type: dataTypes.STRING(100)
        },  
        imagen:{
            allowNull: false,
            type: dataTypes.STRING(100)
        },  

    }
    let config = {
        tableName: "users",
        timestamps: false
    }

    const Users = sequelize.define(alias,cols,config)
    return Users
}