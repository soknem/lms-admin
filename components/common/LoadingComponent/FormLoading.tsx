import React from 'react';
import  Animation  from 'lottie-react';
import Loading from '@/components/common/jsonComponent/formLoading.json'
import Loader from '@/components/common/jsonComponent/formLoginLoader.json'

const FormLoading = () => {
    return (
        <div className="w-full h-auto" >
            <Animation
                animationData={Loading}
                autoPlay
                loop
            />
        </div>
    );
};

export default FormLoading;
