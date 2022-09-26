//en el modelo de movie se explica cada cosa que hago en cada modelo.
const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre' ,{
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.INTEGER
        //los otros datos que hay en la tabla (id,creted_at,updated_at) ya se presuponen por sequelize y por eso no se especifican acá
    });
    Genre.associate = models =>{
        Genre.hasMany(models.Movie)
    }

    return Genre;
}