import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetQuery } from '../../store/query-slice'
import SearchBar from '../SearchBar'
import { getData, mapSongResponseToModel } from '../../utils'
import { RootState } from '../../store'
import { SongResponse } from '../../model/SongResponse'

interface AppBarProps {
    onResult: (data: { data: Array<any>, error: string }) => void,
    onCreatePlaylist: () => void,
    onLogout: (isReset: boolean) => void,
}

const AppBar = ({ onResult, onCreatePlaylist, onLogout }: AppBarProps) => {
    const token = useSelector((state: RootState) => state.user.token)
    const query = useSelector((state: RootState) => state.query.value)
    const dispatch = useDispatch()
    const history = useHistory()

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
            const response: SongResponse = await getData(url, token)
            
            if (response.tracks.items.length === 0) throw Error("Result not found")

            onResult({ data: mapSongResponseToModel(response), error: "" })
        } catch (error: unknown) {
            if (error instanceof Error) {
                onResult({ data: [], error: error.message })
            } else {
                onResult({ data: [], error: "Unknown error" })
            }
        } finally {
            dispatch(resetQuery(true))
        }
    }

    const goToMyPlaylist = () => {
        history.push('my-playlist')
    }

    return (
        <div className="gap-y-4 sm:gap-y-0 grid grid-cols-12 justify-center content-center px-5 py-3 bg-gray-100 sticky top-0">
            <div className="col-start-1 col-end-12 sm:col-start-1 sm:col-end-4">
                <SearchBar onSearch={search}/>
            </div>
            <div className="inline-flex flex-wrap gap-2 sm:gap-3 col-start-1 col-end-12 sm:col-start-8 sm:col-end-12 justify-self-center sm:justify-self-end">
                <button 
                    className="bg-green-100 hover:bg-green-200 text-white border-none px-2 sm:px-4 sm:py-2 font-bold text-sm cursor-pointer rounded-xl" 
                    onClick={onCreatePlaylist}
                >
                    Create Playlist
                </button>
                <button 
                    className="bg-gray-100 hover:bg-gray-200 text-green-100 border-none px-2 sm:px-4 sm:py-2 font-bold text-sm cursor-pointer rounded-xl"
                    onClick={goToMyPlaylist}
                >
                    My Playlist
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-green-100 border-none px-2 sm:px-4 sm:py-2 font-bold text-sm cursor-pointer rounded-xl" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default AppBar