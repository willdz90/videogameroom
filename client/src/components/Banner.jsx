import React from 'react';
import '../styles/Banner.css';
import { Link } from 'react-router-dom';

export default function Banner() {

    return (
        <div className='bannerContainer'>
            <div className='border'>
                <div className='logoContainer'>
                    <Link to='/videogames'>
                        <h1 class="neonText">Game Room</h1>
                    </Link>
                </div> 
                <Link to='/'>
                    <div className='close'>
                        <div className='btnOff'>
                            <div className='rayita1'></div>
                            <p>OFF</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
