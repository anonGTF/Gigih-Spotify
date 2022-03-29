import React from 'react'
import './style.css'

const SearchBar = ({ onSearch }) => {
  
    const onTrigger = (e) => {
        e.preventDefault();
        onSearch(e.target.query.value);
    }
  
    return (
    <form onSubmit={onTrigger}>
        <div className="input-icons">
            <i className="fa fa-search icon" />
            <input 
                className="input-field" 
                type="text" 
                name="query" 
                placeholder="Search song name..." 
                onKeyPress={(e) => e.key === 'Enter' && onTrigger}
            />
        </div>
    </form>
  )
}

export default SearchBar