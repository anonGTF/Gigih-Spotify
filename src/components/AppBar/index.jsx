import React from 'react'
import SearchBar from '../SearchBar'
import { getData } from '../../utils'
import './style.css'

const AppBar = ({ token, onResult, onLogout }) => {
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

    const validate = (query) => {
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

    const search = async (query) => {
        if (!validate(query)) return
        try {
            const url = `https://api.spotify.com/v1/search?q=${query}&type=track`
            const response = await getData(url, token)
            
            if (response.tracks.items.length === 0) throw Error("Result not found")

            onResult({ data: response.tracks.items, error: "" })
        } catch (error) {
            onResult({ data: [], error: error.message })
        }
    }

    return (
        <div className="appbar">
            <SearchBar onSearch={search}/>
            { token === "" ? <button onClick={login}>Login</button> : <button onClick={logout}>Logout</button>}
        </div>
    )
}

export default AppBar