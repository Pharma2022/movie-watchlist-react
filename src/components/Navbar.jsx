import React from 'react'
import  headerImg from '../coverImage.jpg'
export default function Navbar({toggleHome,home}){
    
    

    
    return (
        
        <header style={{
      backgroundImage: `url(${headerImg})` 
   
    }} > 
            <section className='nav-wrapper row '>
            <nav className="nav flex">    
                <h1 className = "nav-title">{home?"Find your film":"My watchlist"}</h1>
                <p className='nav-link pointer' onClick={toggleHome}>{home?"My Watchlist": "Search for Movies"}</p> 
           </nav>
            </section>
        </header>
        
        
        
    )
    
    
}