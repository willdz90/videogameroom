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
import axios from 'axios';
const server = "http://localhost:3001";

export function getVideogames(id){
    return async function(dispatch){
        let json;
        if(id) json = await axios.get(server+`/videogames/${id}`);
        else json = await axios.get(server + "/videogames")
        return dispatch({
            type: GET_VIDEOGAMES,
            payload : json.data
        })
    }
}

export function getVideogameDetail(id){
    return async function(dispatch){
        let json;
        let response;
        if(id){
            json = await axios.get(server+`/videogames/${id}`);
            response = json.data
        }else if(id === 0) response = [];
        return dispatch({
            type: GET_DETAILS,
            payload : response
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        let json = await axios.get(server+'/genres');
        return dispatch({
            type : GET_GENRES,
            payload : json.data
        })
    }
}

export function getGameByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get(server+`/videogames?name=${name}`);
            return dispatch({
                type : GET_GAME_BY_NAME,
                payload : json.data
            })
        } catch (error) {
            return dispatch({
                type : GET_GAME_BY_NAME,
                payload : error.response.data
            })
        }
    }
}

export function getGamesByCreated(value){
    return{
        type : FILTER_BY_CREATED,
        payload : value
    }
}

export function filterGameByGenre(genre){
    return {
            type: FILTER_BY_GENRE,
            payload : genre
    }
}

export function orderByABC(order){
    return {
        type : ORDER_BY_ABC,
        payload : order
    }
}

export function orderByRating(rating){
    return {
        type: ORDER_BY_RATING,
        payload : rating
    }
}

export function createVideogame(newVideogame){
    return async function(dispatch){
        var json = await axios.post(server+'/videogames', newVideogame);
        return dispatch({
            type : CREATE_VIDEOGAME,
            payload : json.data
        })
    }
}