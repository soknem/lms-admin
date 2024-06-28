import {CardReset} from '@/components/card/cartAuth/CardReset'
import React from 'react'
import {CardLogin} from "@/components/card/cartAuth/CardLogin";

export default function page() {
    return (
        <main className=' w-full h-full '>
            <section
                className="relative flex flex-grow min-h-[calc(100vh)] bg-cover bg-center"
                style={{backgroundImage: "url('/form.jpg')"}}
            >
                <section className=' grid content-center h-screen w-full justify-center items-center '>
                    <CardReset/>
                </section>
            </section>
        </main>
    )
}
