import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setQuery } from '../../store/query-slice'

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
        <div className="w-full">
            <i className="fa fa-search absolute p-3 text-white w-5 text-center" />
            <input 
                className="w-full py-3 px-10 text-white bg-gray-200 border-none text-sm font-bold rounded-2xl border-0" 
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