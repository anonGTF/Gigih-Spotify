import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useHistory } from "react-router-dom"
import { PlaylistResponse, Playlist } from "../../model/PlaylistResponse"
import { getData } from "../../utils"
import Placeholder from "../../components/Placeholder"
import errorAnim from "../../assets/animations/error.json"

const MyPlaylist = () => {
    const history = useHistory()
    const { token } = useSelector((state: RootState) => state.user)
    const [results, setResults] = useState(Array<Playlist>())
    const [error, setError] = useState("")

    const goToHome = () => {
        history.push("/create-playlist")
    }

    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const url = `https://api.spotify.com/v1/me/playlists`
                const response: PlaylistResponse = await getData(url, token)
                setResults(response.items)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Unknown error")
                }
            }
        }

        getPlaylist()
    }, [token])
    return (
    <>
        <div className="gap-y-4 sm:gap-y-0 grid grid-cols-12 justify-center content-center px-5 py-3 bg-gray-100 sticky top-0">
            <div className="col-start-1 col-end-12 sm:col-start-1 sm:col-end-3">
                <button className="text-white" onClick={goToHome}>
                    <i className="fa fa-arrow-left w-10 text-center" />
                    Back to Home
                </button>
            </div>
            <div className="text-white col-start-1 col-end-12 sm:col-start-4 sm:col-end-9 text-center">
                <h1 className="text-xl font-bold">My Playlist</h1>
            </div>
        </div>
        <div className="flex flex-wrap justify-center items-center min-h-screen">
            { (results && error === "") && results.map((it) => 
                <div className="w-full border-0 flex text-white my-2">
                    <img className="w-32 h-32 rounded-md" src={it.images[0].url} alt={it.name}/>
                    <div className="p-4 my-auto">
                        <h3 className="text-xl font-bold">{it.name}</h3>
                        <p className="text-sm">{it.description}</p>
                    </div>
                </div>
                ) 
            }
            { (error !== "") &&
                <Placeholder anim={errorAnim} title="Oppss... We have a problem!" message={error} />
            }
        </div>
    </>
  )
}

export default MyPlaylist