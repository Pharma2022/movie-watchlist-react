import React,{useState,useEffect,useCallback} from 'react'
import {nanoid} from 'nanoid'
import Movie from './components/Movie'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import EmptyWatchlist from './components/EmptyWatchlist'

export default function App() {
            const [home,setHome]=useState(true)    
            const [{input},SetInput]= useState({input:""})
            const [searchValue,SetSearchValue]=useState('')
            const [searchArr,setSearchArr]=useState([])
            const [searchHtml,setSearchHtml]=useState(null)
            const [watchlist,setWatchlist]=useState(  ()=> JSON.parse(localStorage.getItem("watchlist")) || []) 
            const [watchlistHtml,setWatchlistHtml]=useState([null])
            
            
            const omdb= (searchLetter, item)=>`https://www.omdbapi.com/?${searchLetter}=${item}&apikey=47d3bcce&`
            
            const toggleHome=()=>setHome(prev=>!prev)
            const handleChange=({target:{value}})=>SetInput(({input: value }))
            const handleSubmit=(e)=>{
                e.preventDefault()
                setSearchArr([])

                setTimeout(()=>SetSearchValue(input),500)
                
        
        }
    
            const toggleWatch=(ID)=>{
                    setSearchArr(prev=>prev.map(item=>item.id===ID? 
                                {...item, onWatchlist:!item.onWatchlist} 
                                 :item  ))
                                            }
      
            const removeWatch=(ID)=>{
                    toggleWatch(ID)
                    setWatchlist(prev=>prev.filter(({id})=>id!==ID))
            }
            
             const getHtml= useCallback((arr)=> arr.map(({Poster,Runtime,imdbID,Title,imdbRating,Genre,onWatchlist,Plot,id})=>(       
                            <Movie
                            id={id}
                            key={id}
                            Poster={Poster}
                            Runtime={Runtime}
                            imdbID={imdbID}
                            Title={Title}
                            imdbRating={imdbRating}
                            Genre={Genre}
                            onWatchlist={onWatchlist}
                            Plot={Plot} 
                            toggleWatch={toggleWatch}
                            removeWatch={removeWatch}
                            home={home}
                                />
                    )), [watchlist,searchArr])
                    
                    
            useEffect(()=>{
                    const search = async searchItem=> { 
                
                            const setSearch = async item=>  { 
                                    const itemRes= await fetch(omdb ("t",item.Title))
                                    const itemData= await itemRes.json()
                                    setSearchArr(prev=>
                                    
                                    
                                     prev.filter(({Response,imdbID:objID})=> Response === 'True'&&objID===itemData.imdbID  )[0]  ? prev: [...prev, {...itemData,onWatchlist:false,id:nanoid()
                                    
                                    }])     
                                    
                         }
            
                        const letter= searchItem.split("").splice(0,2).join("")==="tt"?"i":"s"
                        const res = await fetch(omdb(letter,searchItem))
                        const data   = await  res.json()

                        data.Search.map( movie=> setSearch(movie)   )
                        }
                        
                        searchValue&& search(searchValue.trim())  },[searchValue])
                        
                        
            useEffect(()=>{
                searchArr.length&& searchArr.forEach(item=> setWatchlist(prev=> 
                        item.onWatchlist&& !prev.filter(({id:movieID})=>movieID===item.id).length?
                         [...prev,item]:prev
                                ) )
                searchArr.length&& setSearchHtml(<div>{getHtml(searchArr)} </div>  )  
                },[searchArr])
      
           
            
            useEffect(()=>{          
                 localStorage.setItem("watchlist", JSON.stringify(watchlist))
                setWatchlistHtml(( <div>{watchlist.length? getHtml(watchlist): <EmptyWatchlist toggleHome={toggleHome}/>}</div>) )
                },[watchlist,searchArr] )

    
                return (
                       <div>
                            <Navbar home={home} toggleHome={toggleHome}/>
                    
                            <div className='container'>
                            {home&& <Searchbar input={input} handleChange={handleChange} handleSubmit={handleSubmit} />
                            }    
                            {home?searchHtml:watchlistHtml}
                            
                        </div>
         
                            
                    </div>                   
                    )
}