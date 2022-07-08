import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, getGameByName, getGamesByCreated, filterGameByGenre, orderByABC, orderByRating } from '../redux/actions/index.js';
import loading1 from '../assets/loading1.gif';
import '../styles/Home.css';
import Container from './Container.jsx';
import Banner from './Banner.jsx';
import '../styles/NavBar.css';
import NotFound from './NotFound.jsx';

export default function Home() {

  const allGames = useSelector(state => state.videogames);
  const filtered = useSelector(state => state.gamesFiltered);
  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();
  const [ game, setGame ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);
  let stateToUse = (filtered && filtered.length < allGames.length) &&  (filtered && filtered.length > 0) ? filtered : allGames;

  useEffect(()=>{
    dispatch(getVideogames())
  },[dispatch])

  useEffect(()=>{
    dispatch(getGenres());
  },[dispatch])

  useEffect(()=>{
    if(allGames.length!==0){
      setTimeout(()=>{
        setIsLoading(false)
      },10)
    }
  },[allGames.length])

  function loadGames(e){
    setIsLoading(true);
    // e.preventDefault();
    dispatch(getVideogames());
  }

  function sendInfo(name){
    if(name === ""){
      alert("Debes ingresar un nombre")
    }else{
      setIsLoading(true);
      dispatch(getGameByName(name));
    }
  }

  function handleInputValue(e){
    setGame(e.target.value);
  }

  function handleGenresOption(e){
    e.preventDefault();
    dispatch(filterGameByGenre(e.target.value));
  }

  function handleGamesOption(e){
    e.preventDefault();
    dispatch(getGamesByCreated(e.target.value))
  }

  function handleOrderOption(e){
    e.preventDefault();
    dispatch(orderByABC(e.target.value))
  }

  function handleRatingOption(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value))
  }

  return (
      <div className='fullContainer'>
        { 
          isLoading ?
          <div className='loader'>
            <img src={loading1} alt="cargando" className='loading'/>
          </div> :
          <div>
            <Banner/>
            <div className='navBar'>
              <div>
                <input  className='searchBar' type='Text' autoComplete='false' placeholder="Buscando un juego?" onChange={(e) => handleInputValue(e)}/>
                <input  className='searchBar' type='submit' onClick={()=> sendInfo(game)} disabled={game.length > 0 ? false : true}/>
              </div>
              <div className='genresOptions'>
                <select  className='searchBar' onChange={(e) => handleGenresOption(e)}>
                  <option>Generos...</option>
                  <option value="All">Todos los generos</option>
                  {
                    genres?.map(g => {
                      return(
                        <option key={Math.random()}
                                value={g.name}
                                >{g.name}
                        </option>
                      )
                    })
                  }
                </select>
                <select  className='searchBar' onChange={(e) => handleGamesOption(e)}>
                  <option>Selecciona origen...</option>
                  <option value="gameExist">Games existentes</option>
                  <option value="gameCreated">Games almacenados</option>
                </select>
                <select  className='searchBar' onChange={(e) => handleOrderOption(e)}>
                  <option>Ordenar...</option>
                  <option value="orderAZ">Ordenar A-Z</option>
                  <option value="orderZA">Ordenar Z-A</option>
                </select>
                <select  className='searchBar' onChange={(e) => handleRatingOption(e)}>
                  <option value="All">Todos los rating</option>
                  <option value="1-2.3">1 - 2.3</option>
                  <option value="2.4-3.6">2.4 - 3.6</option>
                  <option value="3.7-5">3.7 - 5</option>
                </select>
              </div>
              <Link to="/register">
                <div>
                  <input className='searchBar' type="submit" value="Registrar un nuevo videogame"/>
                </div>
              </Link>
              <button className='searchBar' onClick={(e)=> loadGames(e)}>Volver a cargar juegos</button>
            </div>
            
            {
              (allGames && typeof allGames === 'string') ?
              <NotFound/> :
              (filtered && filtered.length === 0) && !allGames ? 
              <NotFound/> :
              <Container array={stateToUse}/>
            }
          </div>
        }
      </div>
  )
}
