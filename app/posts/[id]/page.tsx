"use client"

import axios from "axios";
import { use, useEffect, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function Page({ params }) {
    const { id } = useParams();

    const searchQuery = useSearchParams()
    const mode = searchQuery.get("mode")

    const [editing, setEditing] = useState(mode === "edit");
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter()
    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    useEffect(() => {
        setEditing(mode === "edit")
    }, [mode]);

    const fetchPost = async (postId) => {
        const response = await axios.get(`http://localhost:5000/posts/${postId}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/posts/${id}`, {
            title,
            content
        });
        setEditing(false);
        fetchPost(id);
    };

    const handleDelete = async (id) =>{
        await axios.delete(`http://localhost:5000/posts/${id}`)
        router.push("/")
    }

    return (
        <div className="py-20">
            <h1 className="text-3xl text-center">{editing ? "Editar Post" : "Leer Post"}</h1>
            {post && (
                <div className="flex flex-col items-center">
                    {editing ? (
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border p-6">
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título"
                                className="p-2 border border-slate-500"
                            />
                            <textarea 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)}
                                className="border border-slate-500"
                            ></textarea>
                            <button className="w-full bg-green-300">Guardar</button>
                        </form>
                    ) : (
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                            <p>{post.content}</p>
                        </div>
                    )}
                </div> 
            )}

            <div className="flex space-x-4 justify-center mt-5">
                <button onClick={() => router.push('/')} className="bg-green-400 px-3 py-1.5">Home</button>
                <button onClick={() => setEditing(!editing)} className="bg-blue-300 px-3 py-1.5">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="bg-red-300 px-3 py-1.5">Delete</button>
            </div>
        </div>
    );
}
