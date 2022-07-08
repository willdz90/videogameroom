import { GET_GENRES,
    GET_GAME_BY_NAME,
    FILTER_BY_CREATED,
    FILTER_BY_GENRE,
    ORDER_BY_ABC,
    ORDER_BY_RATING,
    CREATE_VIDEOGAME,
    GET_DETAILS,
    GET_VIDEOGAMES
} from '../actionTypes/actionTypes.js';

const initialState = {
    videogames : [],
    genres : [],
    gamesFiltered : [],
    newVideogame : {},
    videogame : []
}

export default function rootReducer(state=initialState, action){

    switch (action.type) {
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames : action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres : action.payload
            }
        case GET_GAME_BY_NAME:
            return{
                ...state,
                videogames : action.payload
            }
        case FILTER_BY_CREATED:
            const genres = state.videogames;
            const stateFiltered = action.payload === 'gameExist' ? state.videogames : genres.filter(g => g.storeInDb)
            return{
                ...state,
                gamesFiltered : stateFiltered 
            }
        case FILTER_BY_GENRE:
            const games = state.videogames; //Array de objetos videogames
            function checkGenre(game){ //Se recibe un objeto con una propiedad array de objs genres
                for(let i=0; i<game.genres.length; i++){
                    if(typeof game.genres === 'string' && game.genres.toLowerCase() === action.payload){
                        return true
                    }else if(typeof game.genres === 'object' && game.genres[i].name.toLowerCase() === action.payload){
                        return true
                    }
                }
            }
            const genresFiltered = action.payload === "All" ? games : games.filter(checkGenre)
            return{
                ...state,
                gamesFiltered : genresFiltered
            }
        case ORDER_BY_ABC:
            const gamesDisorder = JSON.parse(JSON.stringify(state.videogames));
            if(action.payload === "orderAZ"){
                gamesDisorder.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if(nameA < nameB) return -1
                    if(nameA > nameB) return 1
                    return 0;
                })
            }else if(action.payload === "orderZA"){
                gamesDisorder.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if(nameA < nameB) return 1
                    if(nameA > nameB) return -1
                    return 0;
                })
            }
            return {
                ...state,
                videogames : gamesDisorder
            }
        case ORDER_BY_RATING:
            const stateUnorder = state.videogames;
            function checkRating(game){
                if(game.rating >= 1 && game.rating <=2.3 && action.payload === "1-2.3"){
                    return true
                }else if(game.rating >= 2.4 && game.rating <= 3.6 && action.payload === "2.4-3.6"){
                    return true
                }else if(game.rating >=3.7 && game.rating <= 5 && action.payload === "3.7-5"){
                    return true
                }
            }
            const orderRating = action.payload === "All" ? stateUnorder : stateUnorder.filter(checkRating)
            return {
                ...state,
                gamesFiltered : orderRating
            }
        case CREATE_VIDEOGAME:
            return{
                ...state,
                newVideogame : action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                videogame : action.payload
            }
        default:
            return state;
    }
}