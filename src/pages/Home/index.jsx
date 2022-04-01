import React, { useState, useEffect } from 'react'
import SongCard from '../../components/SongCard';
import Placeholder from '../../components/Placeholder';
import AppBar from '../../components/AppBar'
import searchAnim from '../../assets/animations/search.json'
import errorAnim from '../../assets/animations/error.json'
import './style.css'

const Home = () => {
    const [token, setToken] = useState("")
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState([])
    const [error, setError] = useState("")

    const handleResult = ({ data, error }) => {
        setResults(data)
        setError(error)
    }

    const reset = () => {
        setToken("")
        setResults([])
        setSelected([])
    }

    useEffect(() => {
        const access_token = new URLSearchParams(window.location.hash).get('#access_token');
        setToken(access_token ?? "");
    }, [])

    return (
        <>
            <AppBar 
                token={token} 
                onResult={handleResult}
                onLogout={reset}
            />
            <div className="container">
                { (results && error === "") && results.map((it) => 
                    <SongCard 
                        key={it.id}
                        image={it.album.images[1].url} 
                        title={it.name} 
                        singer={it.artists[0].name}
                        isSelected={selected.includes(it.uri)}
                        onSelect={isSelected => 
                            isSelected ? 
                            setSelected(prev => prev.filter(item => item != it.uri)) : 
                            setSelected(prev => [...prev, it.uri])
                        }
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