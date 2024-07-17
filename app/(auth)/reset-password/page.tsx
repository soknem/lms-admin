import {CardReset} from '@/components/card/cartAuth/CardReset'
import React from 'react'
import {CardLogin} from "@/components/card/cartAuth/CardLogin";

export default function page() {
    return (
        <main className='w-full h-screen relative flex items-center justify-center'>
            <section
                className="h-full w-full bg-cover bg-center"
                style={{backgroundImage: "url('/bg-image.jpg')", filter: "blur(4px)"}}
            >
            </section>
            <section className="absolute">
                <CardReset/>
            </section>
        </main>
    )
}
