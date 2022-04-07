import React from 'react'
import './style.css'

const Modal = ({ isShow, onClose, title, children }) => {
  return (
    <div className={`modale ${ isShow ? "opened" : "" }`} aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-header">
                <h2>{title}</h2>
                <button className="btn-close" aria-hidden="true" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal