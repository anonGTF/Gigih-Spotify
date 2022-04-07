import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetQuery } from '../../store/query-slice'
import SearchBar from '../SearchBar'
import { getData } from '../../utils'
import './style.css'

const AppBar = ({ onResult, onCreatePlaylist, onLogout }) => {
    const token = useSelector(state => state.user.token)
    const query = useSelector(state => state.query.value)
    const dispatch = useDispatch()

    const logout = () => {
        onLogout(true)
        window.location.replace("http://localhost:3000/")
    }

    const validate = () => {
        if (query === "") {
            onResult({ data: [], error: "" })
            return false
        }

        return true
    }

    const search = async () => {
        if (!validate()) return
        try {
            const url = `https://api.spotify.com/v1/search?q=${query}&type=track`
            const response = await getData(url, token)
            
            if (response.tracks.items.length === 0) throw Error("Result not found")

            onResult({ data: response.tracks.items, error: "" })
        } catch (error) {
            onResult({ data: [], error: error.message })
        } finally {
            dispatch(resetQuery())
        }
    }

    return (
        <div className="appbar">
            <SearchBar onSearch={search}/>
            <div className="menu">
                <button className="btn" onClick={onCreatePlaylist}>Create Playlist</button>
                <button className="btn-text">My Playlist</button>
                <button className="btn-text" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default AppBar