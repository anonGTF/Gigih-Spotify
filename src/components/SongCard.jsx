import React from 'react'
import './SongCard.css'
import data from '../assets/data'

const SongCard = () => {
  return (
    <div class="card">
        <img
            src={data.album.images[1].url}
            width="180"
            alt='album'
        />
        <h3 class="playlist-title">{data.name}</h3>
        <p class="playlist-singer">{data.artists[0].name}</p>
        <button class="playlist-button">Select</button>
    </div>
  )
}

export default SongCard