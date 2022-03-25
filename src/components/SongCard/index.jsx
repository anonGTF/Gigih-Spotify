import React from 'react'
import './style.css'

const SongCard = ({ image, title, singer }) => {
  return (
    <div class="card">
        <img
            src={image}
            width="180"
            alt='album'
        />
        <h3 class="playlist-title">{title}</h3>
        <p class="playlist-singer">{singer}</p>
        <button class="playlist-button">Select</button>
    </div>
  )
}

export default SongCard