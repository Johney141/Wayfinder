import Lottie from 'lottie-react'
import loadingAnimation from '../../../utils/Animation - 1728311646327.json'


function Loading() {
    return (
        <div className='loading container'>
            <Lottie animationData={loadingAnimation} loop={true} />
        </div>
    )
};

export default Loading