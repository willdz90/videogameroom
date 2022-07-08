import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideogame, getGenres } from '../redux/actions/index.js';
import '../styles/FormContainer.css';
import Banner from './Banner.jsx';

export default function Form() {

  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();
  const [ newGame, setNewGame ] = useState({ genres : [], platforms: [] });
  const [ errores, setErrores ] = useState({ genres : [], platforms: [] });

  useEffect(()=>{
    dispatch(getGenres())
  },[]);

  function validateForm(newGame){
    let errors = {};

    if(!newGame.name){
        errors.name = "No has ingresado el nombre del juego"
    } 
    if(!newGame.released){
        errors.released = "Ingresa la fecha de lanzamiento"
    } else if(!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(newGame.released)){errors.released = 'Debes ingresar un formato valido'; }
    if(!newGame.rating){
        errors.rating = "Ingresa la calificacion del juego"
    } else if(!/^[0-5]([.][0-9]{1,2})?$/.test(Number(newGame.rating))){errors.rating = 'El valor debe ser un numero 0-5 con max 2 decimales (.)'; }
    if(!newGame.description_raw){
        errors.description_raw = "Ingresa la descripción del juego"
    }
    if(!newGame.background_image){
        errors.background_image = "Ingresa una URL para la imagen"
    } else if(!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(newGame.background_image)){errors.background_image = 'Debes ingresar una URL valida'; }
    if(!newGame.genres || newGame.genres.length === 0){
        errors.genres = "Debes seleccionar al menos un genero"
    }
    if(!newGame.platforms || newGame.platforms.length === 0){
        errors.platforms = "Debes seleccionar al menos una plataforma"
    }
    
    return errors;
  }

  function captureValue(e){

    if(e.target.name === "genres"){
      let busqueda = newGame.genres.find(g => g.name === e.target.value);
      if(!busqueda){
        let value = e.target.value;
        let genreBefore = newGame[e.target.name];
        genreBefore.push({name : value})
      }
    }else if(e.target.name === "platforms"){
      let busqueda = newGame.platforms.find(g => g.platform.name === e.target.value)
      if(!busqueda){
        let value = e.target.value
        let genreBefore = newGame[e.target.name];
        genreBefore.push({platform : {name : value}})
      }
    }else{
      setNewGame({
          ...newGame,
          [e.target.name] : e.target.value
      })
    }

    setErrores(validateForm({
        ...newGame,
        [e.target.name] : e.target.value
    }))
  }

  function deleteGenre(e){
    e.preventDefault();
    let busqueda = newGame.genres.filter(g => g.name !== e.target.name);
    setNewGame({
      ...newGame,
      genres : busqueda
    })
    if(newGame.genres.length === 1){
      setErrores(validateForm({
        ...errores,
        genres : []
      }));
    }
  }

  function deletePlatform(e){
    e.preventDefault();
    let busquedaPlatf = newGame.platforms.filter(g => g.platform.name !== e.target.name);
    setNewGame({
      ...newGame,
      platforms : busquedaPlatf
    })

    if(newGame.platforms.length === 1){
      setErrores(validateForm({
        ...errores,
        platforms : []
      }));
    }
  }

  function handleOnSubmit(e){
    // e.preventDefault();
    dispatch(createVideogame(newGame))
  }

  return (
    <div>
        <Banner/>
        <div className='generalContainer'>
          <div className='showForm'>
            <form  className='formContainer' onSubmit={(e)=> handleOnSubmit(e)}>
              <input type="text" name="name" placeholder='Nombre del videogame' onChange={(e) => captureValue(e)} autoComplete="off"/> { errores.name ? <span className='error'>{ errores.name }</span> : null }
              <input type="date" name="released" placeholder='Fecha de lanzamiento' onChange={(e) => captureValue(e)} autoComplete="off"/> { errores.released ? <span className='error'>{ errores.released }</span> : null }
              <input type="text" name="rating" placeholder='Rating' onChange={(e) => captureValue(e)} autoComplete="off"/>
              { errores.rating ? <span className='error'>{ errores.rating }</span> : null }
              <textarea type="text"name="description_raw" placeholder='Descripcion' onChange={(e) => captureValue(e)} autoComplete="off"/>{ errores.description_raw ? <span className='error'>{ errores.description_raw }</span> : null }
              <input type="text" name="background_image" placeholder='Url imagen' onChange={(e) => captureValue(e)} autoComplete="off"/>{ errores.background_image ? <span className='error'>{ errores.background_image }</span> : null }
              <div className='genPlat'>Generos:
              <select name="genres" onChange={(e) => captureValue(e)}>
                <option>Select...</option>
                {
                  genres?.map(g => {
                    return(
                      <option key={Math.random()}>{g.name}</option>
                    )
                  })
                }
              </select>
              </div>
              { errores.genres ? <p className='error'>{ errores.genres }</p> : null }
              <div className='genPlat'>Plataformas:
                <select name="platforms" onChange={(e) => captureValue(e)}>
                  <option>Select...</option>
                  <option value="Xbox">Xbox</option>
                  <option value="Xbox 360">Xbox 360</option>
                  <option value="Xbox One">Xbox One</option>
                  <option value="Xbox Series S/X">Xbox Series S/X</option>
                  <option value="PlayStation">PlayStation</option>
                  <option value="PlayStation 2">PlayStation 2</option>
                  <option value="PlayStation 3">PlayStation 3</option>
                  <option value="PlayStation 4">PlayStation 4</option>
                  <option value="PlayStation 5">PlayStation 5</option>
                  <option value="PS Vita">PS Vita</option>
                  <option value="PSP">PSP</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="Nintendo 3DS">Nintendo 3DS</option>
                  <option value="Nintendo DS">Nintendo DS</option>
                  <option value="Nintendo DSi">Nintendo DSi</option>
                  <option value="PC">PC</option>
                  <option value="macOS">macOS</option>
                </select>
              </div>
                { errores.platforms ? <p className='error'>{ errores.platforms }</p> : null }
              <input type="submit" value="Guardar" disabled={Object.keys(errores).length === 0 ? false : true}/>
          </form>
          </div>
          <div className='showInfoForm'>
            <div className='imgFormContainer'>Imagen publicitaria{
                newGame && newGame.background_image ? <img src={newGame.background_image} alt={newGame.background_image} className="imgForm"></img> : null
              }</div>
            <div>Nombre: {
                newGame && newGame.name ? <p className='pInfoForm'>{newGame.name}</p> : null
            }</div>
            <div>Fecha de lanzamiento: {
                newGame && newGame.released ? <p className='pInfoForm'>{newGame.released}</p> : null
            }</div>
            <div>Rating: {
                newGame && newGame.rating ? <p className='pInfoForm'>{newGame.rating}</p> : null
            }</div>
            <div>Descripcion: {
                newGame && newGame.description_raw ? <p className='pInfoForm'>{newGame.description_raw}</p> : null
            }</div>
            <div>Generos: {
                  newGame && newGame.genres ? newGame.genres?.map(g => {
                    return(
                      <span key={Math.random()} className='pInfoForm'>| {g.name} <button className='deleteGenre' onClick={(e)=>deleteGenre(e)} name={g.name} id="genres">X</button>| </span>
                    )
                  }) : null
            }</div>
            <div>Plataformas: {
                  newGame && newGame.platforms ? newGame.platforms?.map(g => {
                    return(
                      <span key={Math.random()} className='pInfoForm'>| {g.platform.name} <button className='deleteGenre' onClick={(e)=>deletePlatform(e)} name={g.platform.name} id="platforms">X</button> | </span>
                    )
                  }) : null
            }</div>
          </div>
        </div>
    </div>
  )
}
