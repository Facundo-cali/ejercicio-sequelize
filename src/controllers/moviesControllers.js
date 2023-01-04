//traemos el modelo que creamos en models 
const {Movie, Genre, Actor} = require('../database/models')//esto funciona porque al haber un index.js busca ese archivo

module.exports = {
    all: async (req, res) => {//este metodo all muestra un json con todas las peliculas (async permite definir las lineas de codigo que tengo que esperar)
        try {
            const generos = await Genre.findAll();
            const movies = await Movie.findAll({include:{all:true}});
            res.render('index', { movies, generos })
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
    detail: async(req,res) =>{
        const movieId = req.params.id;
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();
        const toDetail = await Movie.findByPk(movieId, {include: ['Genre', 'actores']});
        res.render('detail', { toDetail, generos, actores })
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
        await newMovie.addActores(req.body.actores) 
        //este "actores" es el que pusimos en el select de la view donde seleccionamos cada actor
        /* nosotros le habiamos dado un alias (en el modelo movie) a la relacion entre peliculas y actores(Actores), por eso usamos el comando add de sequelize para agregarle los actores ala pelicula que creamos */
        res.redirect('/')
    },
    update: async (req,res) => {
        const movieId = req.params.id;
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();
        const toEdit = await Movie.findByPk(movieId, {include: ['Genre', 'actores']});
        /* econtramos la pelicula para editar con el id que llega en la url(req.params.id) y con el {include: ['Genre', 'actores']} le estamos pidiendo las RELACIONES que queremos que traiga, Genre y actores son los nombres de cada relacion y las definimos en los modelos. */

        res.render('update_movie', { toEdit, generos, actores })
    },
    change: async (req,res) => {
        const movieId =  req.params.id;
        const changedMovie = await Movie.findByPk(movieId, {include: ['Genre', 'actores']});
        await changedMovie.removeActores(changedMovie.actores);//este actores sale de la RELACION donde establecemos los actores de cada pelicula
        await changedMovie.addActores(req.body.actores);
        await changedMovie.update(req.body);//primero buscamos la pelicula a cambiar con el id, borramos los actores viejos,añadimos los nuevos y luego actualizamos todo lo demas con el metodo update de sequelize
    },
    destroy: async (req, res) => {
        const movieId = req.params.id; //1 - una vez que apretamos el boton de la pelicula que queremos borrar se ejecuta el router.post('/delete/:id',moviesControllers.destroy) de la hoja de rutas, por lo que se guarda el id que identifica la pelicula que queremos borrar
        const toDelete = await Movie.findByPk(movieId, {include: ['Genre', 'actores']});// 2 - agarramos la pelicula con su genero y actores 
        await toDelete.removeActores(toDelete.actores);// 3 - borramos los actores de esa pelicula
        await toDelete.destroy()//borramos la pelicula
        res.redirect('/');//redirigimos al usuario al listado con todas las peliculas
    }
}