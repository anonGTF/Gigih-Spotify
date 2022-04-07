import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../../store/user-slice';
import SongCard from '../../components/SongCard';
import Placeholder from '../../components/Placeholder';
import AppBar from '../../components/AppBar'
import Modal from '../../components/Modal'
import searchAnim from '../../assets/animations/search.json'
import errorAnim from '../../assets/animations/error.json'
import { postData } from '../../utils'
import './style.css'

const Home = () => {
    const dispatch = useDispatch()
    const { id, token } = useSelector(state => state.user)
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

    const reset = (isResetUser) => {
        if (isResetUser) dispatch(resetUser())
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

    const createPlaylist = async () => {
        try {
            const response = await postData(`https://api.spotify.com/v1/users/${id}/playlists`, token, {
                name: title,
                description: description,
                public: false,
                collaborative: false
            })
            postData(`https://api.spotify.com/v1/playlists/${response.id}/tracks`, token, {
                uris: selected
            })
            reset(false)
            closeModal()
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <AppBar 
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
                            setSelected(prev => prev.filter(item => item !== it.uri)) : 
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