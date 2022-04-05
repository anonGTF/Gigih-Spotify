import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setQuery } from '../../store/query-slice'
import './style.css'

const SearchBar = ({ onSearch }) => {
    const query = useSelector(state => state.query.value)
    const dispatch = useDispatch()
  
    const handleChange = (e) => {
        dispatch(setQuery(e.target.value))
    }

    const onTrigger = (e) => {
        e.preventDefault();
        onSearch();
    }
  
    return (
    <form onSubmit={onTrigger}>
        <div className="input-icons">
            <i className="fa fa-search icon" />
            <input 
                className="input-field" 
                type="text" 
                name="query"
                value={query}
                onChange={handleChange}
                placeholder="Search song name..." 
                onKeyPress={(e) => e.key === 'Enter' && onTrigger}
            />
        </div>
    </form>
  )
}

export default SearchBar