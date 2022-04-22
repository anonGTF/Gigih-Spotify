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
import { RootState } from '../../store';
import { Song } from '../../model/Song';
import { CreatePlaylistResponse } from '../../model/CreatePlaylistResponse';

interface Result {
    data: Array<Song>,
    error: string
}

interface PlaylistBodyParams {
    name: string,
    description: string,
    public: boolean,
    collaborative: boolean
}

const Home = () => {
    const dispatch = useDispatch()
    const { id, token } = useSelector((state: RootState) => state.user)
    const [results, setResults] = useState(Array<Song>())
    const [selected, setSelected] = useState(Array<string>())
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleResult = ({ data, error }: Result) => {
        setResults(data)
        setError(error)
    }

    const reset = (isResetUser: boolean) => {
        if (isResetUser) dispatch(resetUser(true))
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

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const validate = (): boolean => {
        if (title.length === 0) {
            setError("Title is required")
            return false
        }
        if (description.length === 0) {
            setError("Description is required")
            return false
        }
        if (title.length <= 10) {
            setError("Title must be at least 10 characters")
            return false
        }
        return true
    }

    const createPlaylist = async () => {
        closeModal()
        if (!validate()) return
        try {
            const body: PlaylistBodyParams = {
                name: title,
                description: description,
                public: false,
                collaborative: false
            }
            const response: CreatePlaylistResponse = await postData(`https://api.spotify.com/v1/users/${id}/playlists`, token, body)
            await postData(`https://api.spotify.com/v1/playlists/${response.id}/tracks`, token, { uris: selected })
            reset(false)
            alert("Playlist created successfully")
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unknown error")
            }
        }
    }

    return (
        <>
            <AppBar 
                onResult={handleResult}
                onCreatePlaylist={openModal}
                onLogout={reset}
            />
            <div className="flex flex-wrap justify-center items-center min-h-screen">
                { (results && error === "") && results.map((it) => 
                    <SongCard 
                        key={it.id}
                        image={it.album} 
                        title={it.title} 
                        singer={it.artist}
                        duration={it.duration}
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
                    size={20} 
                /><br />
                <input 
                    type="text" 
                    name="description" 
                    value={description} 
                    onChange={handleDescChange} 
                    placeholder="Description" 
                    size={20} 
                /><br />
                <button className="bg-green-100 hover:bg-green-200 text-white border-none px-2 sm:px-4 sm:py-2 font-bold text-sm cursor-pointer rounded-xl" onClick={createPlaylist}>Create</button>
            </Modal>
        </>
    )
}

export default Home