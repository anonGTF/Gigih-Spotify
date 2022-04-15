import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setId, setToken } from '../../store/user-slice';
import { getData } from '../../utils'
import Placeholder from '../../components/Placeholder'
import searchAnim from '../../assets/animations/search.json'

const Login = () => {
  const history = useHistory(); 
  const dispatch = useDispatch()
  const { id, token } = useSelector(state => state.user)

  const login = () => {
    const callbackUrl = "http://localhost:3000/"
    const clientId = process.env.REACT_APP_SPOTIFY_ID
    const scope = "playlist-modify-private"
    const url = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(callbackUrl)}`

    window.location.replace(url);
  }

  useEffect(() => {
    if (id === "") return
    history.push("/create-playlist")
  }, [id, history])

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
          const response = await getData("https://api.spotify.com/v1/me", token)
          dispatch(setId(response.id))
      } catch (error) {
          console.log(error.message)
      }
    }

    if (token === "") return
    getCurrentUser()
  }, [token, dispatch])

  useEffect(() => {
      const access_token = new URLSearchParams(window.location.hash).get('#access_token');
      dispatch(setToken(access_token ?? ""))
  }, [dispatch])

  return (
    <div className='h-screen flex flex-col gap-6 justify-center items-center'>
        <Placeholder anim={searchAnim} title="Login and Search Any Songs Around the World" />
        <button className="bg-green-100 hover:bg-green-200 text-white border-none px-2 sm:px-4 sm:py-2 font-bold text-sm cursor-pointer rounded-xl" onClick={login}>Login</button>
    </div>
  )
}

export default Login