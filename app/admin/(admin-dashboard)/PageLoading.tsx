import React from 'react';
import Animation from 'lottie-react';
import Loader from '@/components/common/jsonComponent/formLoginLoader.json'

const PageLoading = () => {
    return (
        <div className="w-full h-autor">
            <Animation
                animationData={Loader}
                autoPlay
                loop
            />
        </div>
    );
};

export default PageLoading;
