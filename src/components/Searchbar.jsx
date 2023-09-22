import React from 'react'

const Searchbar=({input,handleChange,handleSubmit})=>(
    <form onSubmit={handleSubmit}className=" search-container row">
                                <label htmlFor='search'>
                                    <i id='search-icon' className="fa fa-search"onClick={handleSubmit} ></i>
                                </label>
                                <input
                                    type="text"
                                    name="input"
                                    placeholder="Search for your movie here" 
                                    value={input}
                                    onChange={handleChange}
                                    id='searchInput'
                                    />
                            
                                <button className='searchBtn pointer' >
                                    Search 
                                </button>
                    
                        </form>
)



export default Searchbar