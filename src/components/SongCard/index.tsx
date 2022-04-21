import { formatMilliseconds } from '../../utils'

interface SongCardProps {
  image: string,
  title: string,
  singer: string,
  duration: number,
  isSelected: boolean,
  onSelect: (isSelected: boolean) => void,
}

const SongCard = ({ image, title, singer, duration, isSelected, onSelect }: SongCardProps) => {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 border border-solid border-gray-150 m-5 p-4 w-48 text-center rounded-lg transition">
        <img
            src={image}
            width="180"
            alt='album'
        />
        <h3 className="mt-3 mb-0 text-base font-bold text-ellipsis whitespace-nowrap overflow-hidden text-white">{title}</h3>
        <p className="mt-1 mb-0 text-xs text-white">{singer}</p>
        <p className="mt-1 mb-0 text-xs text-white">{formatMilliseconds(duration)}</p>
        <button className="bg-green-100 text-black border-none py-2 px-4 text-xs font-bold rounded-xl cursor-pointer mt-3" onClick={() => onSelect(isSelected)}>{ isSelected ? "Deselect" : "Select" }</button>
    </div>
  )
}

export default SongCard