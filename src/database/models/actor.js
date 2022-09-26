const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor' ,{
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        favorite_movie_id:DataTypes.INTEGER
        //los otros datos que hay en la tabla (id,creted_at,updated_at) ya se presuponen por sequelize y por eso no se especifican acá
    });
    Actor.associate = models =>{
        Actor.belongsToMany(models.Movie,{
            through:'actor_movie',//esta es la tabla intermedia que necesitamos para hacer relaciones de muchos a muchos
            as:'peliculas'
        });
    }

    return Actor;
}