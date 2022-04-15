import './style.css'

interface ModalProps {
  isShow: boolean,
  onClose: () => void,
  title: string,
  children: React.ReactNode
}

const Modal = ({ isShow, onClose, title, children }: ModalProps) => {
  return (
    <div className={`modale ${ isShow ? "opened" : "" }`} aria-hidden="true">
        <div className="modal-dialog">
            <div className="py-1 px-3">
              <h2 className='text-xl py-1 px-3'>{title}</h2>
              <button 
                className="text-gray-300 hover:text-gray-400 bg-transparent cursor-pointer border-none text-xl p-3 absolute right-2 top-0" 
                aria-hidden="true" 
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
        </div>
    </div>
  )
}

export default Modal