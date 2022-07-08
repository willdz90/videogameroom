import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import ReactPlayer from 'react-player/youtube'

export default function LandingPage() {

  const [ isMuted, setIsMuted ] = useState(true);
  const [ vol, setVol ] = useState(1);

  function unMuteVideo(e){
    e.preventDefault();
    if(isMuted){
      setIsMuted(false);
    }else if(!isMuted){
      setIsMuted(true)
    }
  }

  function volumeUD(e){
    e.preventDefault();
    if(e.target.id === "arriba" && vol < 1){
      setVol(vol+0.2)
    }else if(e.target.id === "abajo" && vol > 0){
      setVol(vol-0.2)
    }
  }

  return (
      <div className='landingContainer'>
        <div className='mockup'>
          <div className='gameWatch'>
            GAME & WATCH
          </div>
          <div className='arrows'>
            <div id="circulo-flechas"></div>
            <div id="cruz-1a"></div>
            <div id="cruz-2a"></div>
            <div id="cruz-1b"></div>
            <div id="cruz-2b"></div>
            <div id="cruz-brillo1"></div>
            <div id="cruz-brillo2"></div>
            <div id="cruz-brillo3"></div>
            <div id="arriba0"></div>
            <div id="arriba1"></div>
            <div id="arriba" onClick={(e) => volumeUD(e)}></div>
            <div id="derecha1"></div>
            <div id="derecha0"></div>
            <div id="derecha"></div>
            <div id="abajo0"></div>
            <div id="abajo1"></div>
            <div id="abajo" onClick={(e) => volumeUD(e)}></div>
            <div id="izquierda0"></div>
            <div id="izquierda1"></div>
            <div id="izquierda"></div>
            <div id="cruz-circulito"></div>
          </div>
          <div className='buttons'>
            <button className='gameBtn letters' onClick={(e) => unMuteVideo(e)}/>
            GAME
            <button className='timeBtn letters'/>
            TIME
            <button className='pauseBtn letters'/>
            PAUSE/SET
          </div>
          <div className='buttonsAB'>
            <Link to='/videogames'>
              <button className='btnB1'/>
            </Link>
            <Link to='/videogames'>
              <button className='btnA1'/>
            </Link>
            <div className='btnB letters'>B</div><div  className='btnA letters'>A</div>
          </div>
          <div className='mainArea'>
            <div className='titleConsole'>
              SUPER MARIO BROS.
            </div>
            <div className='showInfo'>
             <ReactPlayer 
              url='https://www.youtube.com/watch?v=ozyq3PDRQsU'
              className='videoPlayer'
              width="29.1vw"
              height="44.9vh"
              muted={isMuted}
              playing={true}
              volume={vol}
            /> 
            </div>
            <div className='nintendo'>
              Nintendo
            </div>
          </div>
        </div>
      </div>
  )
}
