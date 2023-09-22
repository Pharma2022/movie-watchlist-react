import React from 'react'

 const  Movie= ({Poster,Runtime,imdbID,Title,imdbRating,Genre,onWatchlist,Plot,toggleWatch,removeWatch,id})=> {
     
     const func= ()=> onWatchlist? removeWatch(id):toggleWatch(id)
     const watchBtn= <i className={`fa fa-circle-${onWatchlist?'minus':'plus'} pointer noUnderline`} onClick={func}></i>
     const watchText= <p onClick={func} className={'watchText pointer'} >{onWatchlist? "remove":'add'}</p>
     
     return (
    <div className="search-result row">   
    
       <img  className="search-img" src ={Poster}/> 
            <div className='search-content flex'>
               
                <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank" className="search-title pointer">{Title} {imdbRating}⭐</a>
              
             
                <span className='row search-details '>
                    <p className= "runtime">{Runtime!="N/A"? Runtime:""}</p>
                    <p className= "genre">{Genre}</p>
                {watchBtn}
                {watchText}
                
                </span>
                <p className="plot">{Plot}</p>
            </div>  
    </div> 

    
   
    )}

export default Movie


