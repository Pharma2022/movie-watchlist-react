import React from 'react'

const EmptyWatchlist=({toggleHome})=>(
    <div className='emptyWatch'> <p >Your watchlist is looking empty</p>
    <br/>
     {<p className='pointer orange add-movies ' onClick={toggleHome}>lets add some movies {<i className="fa fa-circle-plus"></i>}</p>}  </div>
)



export default EmptyWatchlist