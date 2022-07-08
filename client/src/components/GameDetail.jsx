import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getVideogames } from '../redux/actions/index.js';

export default function GameDetail() {

    const videogame = useSelector(state => state.videogames)
    const dispatch = useDispatch();
    let {idVideogame} = useParams();

    useEffect(()=>{
        dispatch(getVideogames(idVideogame))
    }, [])

    return (
        <div>
            <img src={videogame.imagen} alt={"Imagen "+videogame.nombre}/>
            <div>{videogame.id}</div>
            <div>{videogame.nombre}</div>
            <div>{videogame.fechaDeLanzamiento}</div>
            <div>{videogame.rating}</div>
            <div>{videogame.descripcion}</div>
            <div>
                {
                    videogame.generos?.map(gen => {
                        return(
                            <span key={Math.random()}>| {gen.name} | </span>
                        )
                    })
                }
            </div>
            <div>
                {
                    videogame.plataformas?.map(p => {
                        return(
                            <span key={Math.random()}>| {p.platform.name} | </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
