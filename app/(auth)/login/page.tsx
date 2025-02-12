'use client'
import { CardLogin } from '@/components/card/cartAuth/CardLogin';
import React, {useEffect, useState} from 'react';
import FormLoading from "@/components/common/LoadingComponent/FormLoading";
import FormLoaderSuccess from "@/components/common/LoadingComponent/FormLoaderSuccess";
import {useAppDispatch} from "@/lib/hook";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";

export default function Login() {
    const [isSuccess, SetIsSuccess] = useState(false);

    return (
        <>
            {isSuccess ? (
                <FormLoaderSuccess/>
            ) : (
                <main className='w-full h-screen relative flex items-center justify-center'>
                    <section
                        className="h-full  w-full bg-cover bg-center"
                        style={{backgroundImage: "url('/bg-image.jpg')", filter: "blur(4px)"}}
                    >
                    </section>
                    <section className="absolute">
                        <CardLogin SetIsSuccess={SetIsSuccess}/>
                    </section>
                </main>

            )}
        </>


    )
        ;
}
