import React from 'react';
import  Animation  from 'lottie-react';
import Loading from '@/components/common/jsonComponent/formLoading.json'
import Loader from '@/components/common/jsonComponent/formLoginLoader.json'

const FormLoadingSuccess = () => {
    return (
        <div className="w-[500px] mx-auto " >
            <Animation
                animationData={Loader}
                autoPlay
                loop
            />
            <p className="text-center -mt-8 ">We are getting your dashboard ready 🤗, hold tight!...</p>
        </div>
    );
};

export default FormLoadingSuccess;
