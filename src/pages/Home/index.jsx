import React, { useState, useEffect } from 'react'
import SongCard from '../../components/SongCard';
import SearchBar from '../../components/SearchBar';
import Placeholder from '../../components/Placeholder';
import searchAnim from '../../assets/animations/search.json'
import errorAnim from '../../assets/animations/error.json'
import { getData } from '../../utils'
import './style.css'

const Home = () => {
    const [token, setToken] = useState("")
    const [results, setResults] = useState([])
    const [error, setError] = useState("")

    const validate = (query) => {
        if (token === "") {
            alert("Please login first!");
            return false
        }

        if (query === "") {
            setResults([])
            setError("")
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

            setError("")
            setResults(response.tracks.items)
        } catch (error) {
            setError(error.message);
        }
    }

    const login = () => {
        const callbackUrl = "http://localhost:3000/"
        const clientId = process.env.REACT_APP_SPOTIFY_ID
        const scope = "playlist-modify-private"
        const url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(callbackUrl)}`

        window.location.replace(url);
    }

    const logout = () => {
        setToken("")
        window.location.replace("http://localhost:3000/");
    }

    useEffect(() => {
        const access_token = new URLSearchParams(window.location.hash).get('#access_token');
        setToken(access_token ?? "");
    }, [])

    return (
        <>
            <div className="appbar">
                <SearchBar onSearch={search}/>
                { token === "" ? <button onClick={login}>Login</button> : <button onClick={logout}>Logout</button>}
            </div>
            <div className="container">
                { (results && error === "") && results.map((it) => 
                <SongCard 
                    key={it.id}
                    image={it.album.images[1].url} 
                    title={it.name} 
                    singer={it.artists[0].name}
                />) 
                }
                { (results.length === 0 && error === "") && 
                    <Placeholder anim={searchAnim} title="Find any music! Only on Spotify" />
                }
                { (error !== "") &&
                    <Placeholder anim={errorAnim} title="Oppss... We have a problem!" message={error} />
                }
            </div>
        </>
    )
}

export default Home