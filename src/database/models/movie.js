const { sequelize, DataTypes } = require('sequelize'); //conectamos sequelize con la base de datos, usamos 2 cosas, la coneccion y otro objeto llamado DataTypes



/* definimos un modulo que es una funcion que recibe una conexion de sequelize y recibe dataTypes, una variable que se crea y define a una entidad movie, define
cada una de sus columnas en la base de datos, sequelize busca por detras la tabla movies y machea todo para que coincida y si no machea va a tirar error */
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie',{
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    });
    Movie.associate = (models => {
        Movie.belongsTo(models.Genre);
        Movie.belongsToMany(models.Actor,{
            as: 'actores', //esto es el COMO VA A APARECER cuando pidamos los actores de una pelicula,le damos un alias a la relacion.
            through:'actor_movie' //esta es la tabla intermedia que necesitamos para hacer relaciones de muchos a muchos
        })
    })
    return Movie;
}
/* sequelize.define('Movie',{
        title: DataTypes.STRING,
        raiting: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataType.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    },{
        tiemstamps: false
    }) 


    Movie.associate = (models => {
        Movie.belongsTo(models.Genre);
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ? sequelize.define() recibe 3 parametros.
    *('Movie' seria el nombre, cada vez q llamemos a una pelicula usaremos este string; sequelize busca automaticamente la tabla pluralizada (osea Movies))
    
    *(El segundo parametro es un objeto donde estan todas las columnas de nuestra tabla (con su tipo de variable que podemos buscarla en la documentacion de sequelize):{
        -la columna id no hace falta agregar porque sequelize la agrega automaticamente
        -las columnas de tipo TimeStamp (created_at y updated_at) tambien se interpretan automaticamente)
    }

    *(El tercer parametro son las opciones que queremos establecer, por ejemplo podriamos indicarle que las columnas tipo TimeStamp no existen y no las llene automaticamente)

    ? Movie.associate 
    * sirve para definir nuestras relaciones.
    * .belongsTo() (significa pertenece a ...)
    * .hasMany() (significa tiene muchos)
    * Debemos hacer esto en los 2 modelos que se relacionan, por ejemplo,en el modelo movie -> pelicula pertenece a un genero (belongsTo()) y en el modelo genero -> genero tiene muchas peliculas (hasMany())
    */