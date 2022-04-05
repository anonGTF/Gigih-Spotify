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

    const login = () => {
        const callbackUrl = "http://localhost:3000/"
        const clientId = process.env.REACT_APP_SPOTIFY_ID
        const scope = "playlist-modify-private"
        const url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(callbackUrl)}`

        window.location.replace(url);
    }

    const logout = () => {
        onLogout()
        window.location.replace("http://localhost:3000/")
    }

    const validate = () => {
        if (token === "") {
            alert("Please login first!");
            return false
        }

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
                { token === "" ? 
                    <button className="btn-text" onClick={login}>Login</button> : 
                    <button className="btn-text" onClick={logout}>Logout</button>
                }
            </div>
        </div>
    )
}

export default AppBar