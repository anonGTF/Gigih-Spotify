import Lottie from 'lottie-react-web'

interface PlaceholderProps {
  anim: any,
  title: string,
  message?: string,
}

const Placeholder = ({ anim, title, message }: PlaceholderProps) => {
  return (
    <div className="text-center">
        <Lottie 
            options={{
                animationData: anim
            }}
            width="360px"
            height="360px"
        />
        <p className='-mt-5 text-gray-500 text-2xl font-bold'>{title}</p>
        <p className="-mt-2 text-gray-500 text-xl">{message}</p>
    </div>
  )
}

export default Placeholder