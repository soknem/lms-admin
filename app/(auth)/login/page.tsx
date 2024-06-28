import {CardLogin} from '@/components/card/cartAuth/CardLogin'
import React from 'react'

export default function page() {
    return (
        <main className=' w-full h-full '>
            <section
                className="relative flex flex-grow min-h-[calc(100vh)] backdrop-blur-sm bg-cover bg-center"
                style={{backgroundImage: "url('/form1.jpg')"}}
            >
                <section className=' grid content-center h-screen w-full justify-center items-center '>
                    <CardLogin/>
                </section>
            </section>
        </main>
    )
}
