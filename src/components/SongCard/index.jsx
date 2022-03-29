import React from 'react'
import './style.css'

const SongCard = ({ image, title, singer }) => {
  return (
    <div className="card">
        <img
            src={image}
            width="180"
            alt='album'
        />
        <h3 className="playlist-title">{title}</h3>
        <p className="playlist-singer">{singer}</p>
        <button className="playlist-button">Select</button>
    </div>
  )
}

export default SongCard