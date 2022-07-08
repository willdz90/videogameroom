const { Router } = require('express');
const { Genero, Videogame } = require('../db.js');
const axios = require('axios');
const { REACT_API_KEY } = process.env;


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getInfofromApi = async () => {
    try {
        let videogames = [];
        let counter = 1;
        while(counter < 6){
            const response = await axios.get(`https://api.rawg.io/api/games?key=${REACT_API_KEY}&page=${counter}`);
            let information = await response.data.results;
            if(information){
                for(let game of information){
                    videogames.push({
                        id : game.id,
                        background_image: game.background_image,
                        name : game.name,
                        rating : game.rating,
                        genres: game.genres,
                    })
                }
                counter++;
            }else{
                console.log("No hay informacion disponible")
            }
        }
        return videogames;
    } catch (error) {
        return error.response.data.error;
    }

};

const getDbInfo = async () => {
    try {
        return await Videogame.findAll({
          include : {
            model: Genero,
            attributes : ['name'],
            through: {
              attributes : [],
            }
          }
        })
    } catch (error) {
        return "Encontramos el siguiente error : " + error.response.data.error;
    }
};

const getGameDetails = async (id) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${REACT_API_KEY}`);
        return {
            id : response.data.id,
            background_image : response.data.background_image,
            name : response.data.name,
            genres : response.data.genres,
            description_raw : response.data.description_raw,
            released : response.data.released,
            rating : response.data.rating,
            platforms : response.data.platforms
        }
    } catch ({response}) {
        return "Encontramos el error '" + response.status + " " + response.data.detail + "' en la busqueda";
    }
};

const getGenresGame = async ()=> {
    try {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${REACT_API_KEY}`)
        return response.data.results;
    } catch (error) {
        return "Ops! aparecio el siguiente error: " + error
    }
}

router.get("/videogames", async (req, res)=>{
    //   - Obtener un listado de los videojuegos
    //   - Debe devolver solo los datos necesarios para la ruta principal
    //   - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
    //   - Si no existe ningún videojuego mostrar un mensaje adecuado
    try {
        const { name } = req.query;
        let allVideogames = await getInfofromApi();
        let gamesInDb = await getDbInfo();
        let allData = allVideogames.concat(gamesInDb)
        if(name){
            let gameName = allData.filter( g => g.name.toLowerCase().includes(name.toLowerCase()));
            gameName.length ? 
            res.status(200).send(gameName.slice(0,15)) : 
            res.status(404).send("No existe el videogame "+ name)
        }else{
            if(allData){
                res.status(200).send(allData)
            }else{
                res.status(404).send("Hola soy un error")
            }
        }
    } catch (error) {
        res.send(error);
    }
});

router.get("/videogames/:idVideogame", async (req, res) => {
    //   - Obtener el detalle de un videojuego en particular
    //   - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
    //   - Incluir los géneros asociados

    try {
        const { idVideogame } = req.params;
        let infoGame = await getGameDetails(idVideogame);
        res.status(200).send(infoGame);
    } catch (error) {
        res.send(error.response.data.error);
    }
});

router.get("/genres", async (req, res) => {
    //   - Obtener todos los tipos de géneros de videojuegos posibles
    //   - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
    try {
        let genresGame = await getGenresGame();
        genresGame.map( g => {
            Genero.findOrCreate({
                where : {
                    name : g.name.toLowerCase(),
                }
            })
        });
        const allGenres = await Genero.findAll();
        res.status(200).send(allGenres)

    } catch (error) {
        console.log(error.name)
        res.send(error)
    }
});

router.post("/videogames", async (req, res) => {
    //   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
    //   - Crea un videojuego en la base de datos, relacionado a sus géneros.   
    try {
        let { background_image, name, description_raw, released, rating, platforms, genres } = req.body;
        let [ newGame, created] = await Videogame.findOrCreate({
                where :{
                    background_image, name, description_raw, released, rating, platforms, genres
                }
        })
        if(created){
            res.status(200).send("Videogame guardado");
        }else{
            res.status(401).send("El videogame "+ name + " ya se encuentra en la DB")
        }
    } catch (error) {
        res.status(401).send(error)
    }
})

module.exports = router;
