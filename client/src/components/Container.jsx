import React, { useState } from 'react';
import Game from './Game';
import '../styles/Home.css';
import Paginado from './Paginado';
import Modal from './Modal';

export default function Container({array}) {

  const [ active, setActive ] = useState(false);
  const [ id, setId ] =useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vgPerPage, setVgPerPage] = useState(15);
  const [ game, setGame ] = useState("");
  const indexLastVg = currentPage * vgPerPage;
  const indexOfFirstVg = indexLastVg - vgPerPage;
  let currentVideogames = array.slice(indexOfFirstVg, indexLastVg);
  
  const paginado = (e, pageNumber) => {
    setCurrentPage(pageNumber)
  };
  
  const toggle = (e) =>{
    setActive(!active)
    setId(e.target.id)
  }

  return (
    <div>
      <Paginado vgPerPage={vgPerPage}
        array={array.length}
        paginado={paginado}
      />
      <Modal active={active} toggle={toggle} id={id} array={currentVideogames}/>
      <div className='contentContainer'>
        {
          currentVideogames?.map(game => {
              return(
                <Game 
                  key={game.id}
                  id={game.id} 
                  nombre={game.name} 
                  generos={game.genres} 
                  imagen={game.background_image}
                  toggle={toggle}
                />
                  
              )
          })
        }
      </div>
    </div>

  )
}
