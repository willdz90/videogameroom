import Portal from '../portal';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameDetail } from '../redux/actions/index.js';
import loading1 from '../assets/loading1.gif';
import '../styles/Modal.css';

export default function Modal ({toggle, active, id, array}){

    let idVideogame = Number(id);
    if(id.length > 6 ){
        idVideogame = id;
    }else{
        idVideogame = Number(id);
    }

    const videogames = useSelector(state => state.videogame)
    const dispatch = useDispatch();
    let videogame = typeof videogames === 'string' ? array.find(g => g.id === id) : videogames

    useEffect(()=>{ //componentDidMount //ComponentDidUpdate
        dispatch(getVideogameDetail(idVideogame))
    }, [dispatch, idVideogame])
    
    return (
        <Portal>
            {
                active && (
                <div className='wrapper'>
                    <div className='window'>
                       {
                            videogame && videogame.length === 0 ?
                            
                            <div className='loaderModal'>
                                <img src={loading1} alt="cargando" className='loadingModal'/>
                            </div> :
                            <div className='window'>
                                <button className='btnClose' onClick={toggle}>X</button>
                                <img src={videogame.background_image} alt={"Imagen "+videogame.name} className="imgModal"/>
                                <div className='infoModal'><b>ID:</b> {videogame.id}</div>
                                <div className='infoModal'><b>NOMBRE:</b> {videogame.nombre}</div>
                                <div className='infoModal'><b>FECHA DE LANZAMIENTO:</b> {videogame.released}</div>
                                <div className='infoModal'><b>RATING:</b> {videogame.rating}</div>
                                <div className='infoModal'><b>DESCRIPCION:</b> {videogame.description_raw}</div>
                                <div className='infoModal'><b>GENEROS:</b> 
                                    {
                                        videogame.genres?.map(gen => {
                                            return(
                                                <span key={Math.random()}>| {gen.name} | </span>
                                            )
                                        })
                                    }
                                </div>
                                <div className='infoModal'><b>PLATAFORMAS:</b> 
                                    {
                                        videogame.platforms?.map(p => {
                                            return(
                                                <span key={Math.random()}>| {p.platform.name} | </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            
                        }
                    </div>
                    <div onClick={toggle} className="backgroundModal"></div>
                </div>    
                )   
            }
        </Portal>
    )
}
