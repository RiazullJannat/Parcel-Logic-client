import Lottie from 'lottie-react';
import loading from '../../assets/animations/Loading.json';

const Loading = () => {
    return (
        <div className='min-h-full border min-w-full flex justify-center items-center'>
            <Lottie animationData={loading}></Lottie>
        </div>
    );
};

export default Loading;