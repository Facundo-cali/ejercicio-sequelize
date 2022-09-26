//traemos el modelo que creamos en models 
const {Movie, Genre, Actor} = require('../database/models')//esto funciona porque al haber un index.js busca ese archivo

module.exports = {
    all: async (req, res) => {//este metodo all muestra un json con todas las peliculas (async permite definir las lineas de codigo que tengo que esperar)
        try {
            const moviesJson = await Movie.findAll({include:{all:true}});
            res.json(moviesJson);
            /* Movie.findAll() trae todas las peliculas
            y ({include:{all:true}}) sirve para decirle que traiga todas las relaciones que tenga cada pelicula,
            tambien podemos pasarle ({include:['Genre']}) para que solo triga la relacion de genero */

            /* const moviesJson = await Movie.findOne({
                attributes:['title','length'],
                where: {title: 'Avatar'
                }
            })
            const moviesJs = await moviesJson.json();*/

        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) =>{
        const generos = await Genre.findAll();//esto devuelve un array con todos los generos y a esto lo recorremos con un forEach.
        const actores = await Actor.findAll();
        res.render('create_movie', { generos, actores })
    },
    store: async (req,res) => {
        console.log(req.body);
        /* se puede hacer con .create (que es una funcion que nos da sequelize) y definir cada propiedad por el req.body, asi ->
        const newMovie = await Movie.create({
            title: req.body.title
            rating: req.body.rating
            etc...
        }), pero es mas facil hacerlo de esta otra manera, donde le decimos que TODAS las propiedades ya vienen en el req.body -> */
        const newMovie = await Movie.create(req.body)
        await newMovie.addActores(req.body.actores) //este "actores" es el que pusimos en el select de la view donde seleccionamos cada actor
        /* nosotros le habiamos dado un alias (en el modelo movie) a la relacion entre peliculas y actores(Actores), por eso usamos el comando add de sequelize para agregarle los actores ala pelicula que creamos */
        res.redirect('/')
    },
    update: async (req,res) => {

    },
    change: async (req,res) => {

    }
}