import React from 'react';
import '../styles/Game.css';

export default function Game({id, imagen, nombre, generos, toggle}) {
    
    let genre;
    let arrayGenres = [];
    if(typeof generos === 'string'){
        genre = generos
    }else if(typeof generos === 'object'){
        for(let i=0; i<generos.length;i++){
            arrayGenres.push(generos[i].name)
        }
    }
    
    return (
    <div key={id} onClick={(e) => {toggle(e)}}>
        <div key={Math.random()} className="gameContainer" id={id}>
            <p className='infoGame' id={id}>ID: {id.length > 6 ? id.slice(0,6) : id}</p>
            <div className='containerImg' id={id}>
                <img src={imagen} alt={nombre} className="imgGame" id={id}/>
            </div>
            <p className='infoGame' id={id}>Nombre: {nombre}</p>
            {
                genre ? <span id={id}>Generos: {genre}</span> :
                <p className='infoGame' id={id}> Genero: {arrayGenres?.map(g => {
                    return(
                        <span key={Math.random()} id={id}>{g}  </span>
                    )
                })}
                </p>
            }
        </div>
    </div>
    )
}
