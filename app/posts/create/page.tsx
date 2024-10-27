"use client"

import axios from "axios"
import { useState } from "react" 
import { useRouter } from 'next/navigation'
 

const Create = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/posts", { title, content })
            alert("Post creado con éxito!")
            router.push('/')
        } catch (error) {
            console.error("Error al crear el post:", error)
            alert("Ocurrió un error al crear el post. Por favor, inténtelo de nuevo.")
        }
    }

    return (
        <div className="flex flex-col items-center py-20">
            <h1 className="text-3xl">Crear Nuevo Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border p-6">
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    className="p-2 border border-slate-500"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Contenido"
                    value={content}
                    className="p-2 border border-slate-500"
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className="w-full bg-green-500 py-1.5">Crear Post</button>
            </form>
        </div>
    )
}

export default Create
