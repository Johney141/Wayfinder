import Lottie from 'lottie-react'
import loadingAnimation from '../../../utils/Animation - 1728311646327.json'
import './Loading.css'


function Loading() {
    return (
        <div className='loading-container'>
            <Lottie 
                animationData={loadingAnimation} 
                loop={true}
                style={{width: 350, height: 350}} />
        </div>
    )
}

export default Loading