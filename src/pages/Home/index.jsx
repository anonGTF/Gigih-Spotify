import React, { useState, useEffect } from 'react'
import SongCard from '../../components/SongCard';
import Placeholder from '../../components/Placeholder';
import AppBar from '../../components/AppBar'
import Modal from '../../components/Modal'
import searchAnim from '../../assets/animations/search.json'
import errorAnim from '../../assets/animations/error.json'
import { getData, postData } from '../../utils'
import './style.css'

const Home = () => {
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleResult = ({ data, error }) => {
        setResults(data)
        setError(error)
    }

    const reset = () => {
        setToken("")
        setResults([])
        setSelected([])
        setTitle("")            
        setDescription("")
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescChange = (e) => {
        setDescription(e.target.value)
    }

    const getCurrentUser = async () => {
        try {
            const response = await getData("https://api.spotify.com/v1/me", token)
            setUserId(response.id)
        } catch (error) {
            setError(error.message)
        }
    }

    const createPlaylist = async () => {
        try {
            const response = await postData(`https://api.spotify.com/v1/users/${userId}/playlists`, token, {
                name: title,
                description: description,
                public: false,
                collaborative: false
            })
            postData(`https://api.spotify.com/v1/playlists/${response.id}/tracks`, token, {
                uris: selected
            })
            reset()
            closeModal()
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (token === "") return
        getCurrentUser() 
    }, [token])

    useEffect(() => {
        const access_token = new URLSearchParams(window.location.hash).get('#access_token');
        setToken(access_token ?? "");
    }, [])

    return (
        <>
            <AppBar 
                token={token} 
                onResult={handleResult}
                onCreatePlaylist={openModal}
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
            <Modal 
                isShow={showModal} 
                onClose={closeModal} 
                title="Create new playlist"
            >
                <input 
                    type="text" 
                    name="title" 
                    value={title} 
                    onChange={handleTitleChange} 
                    placeholder="Title" 
                    size="20" 
                /><br />
                <input 
                    type="text" 
                    name="description" 
                    value={description} 
                    onChange={handleDescChange} 
                    placeholder="Description" 
                    size="20" 
                /><br />
                <button className="btn-create" onClick={createPlaylist}>Create</button>
            </Modal>
        </>
    )
}

export default Home