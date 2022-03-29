import React from 'react'
import Lottie from 'lottie-react-web'
import './style.css'

const Placeholder = ({ anim, title, message }) => {
  return (
    <div className="placeholder">
        <Lottie 
            options={{
                animationData: anim
            }}
            width="360px"
            height="360px"
        />
        <p>{title}</p>
        <p className="message">{message}</p>
    </div>
  )
}

export default Placeholder