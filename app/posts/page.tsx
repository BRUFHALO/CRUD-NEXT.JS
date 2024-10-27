"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Posts(){
    const [posts, setPosts] = useState([])
    
    const fetchRecords = async () => {
        try {
            const res = await axios.get("http://localhost:5000/posts")
            setPosts(res.data)
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }

    useEffect(() => {
        fetchRecords()
    }, [])

    const handleDelete = async (id) =>{
        await axios.delete(`http://localhost:5000/posts/${id}`)
        const filterData = posts.filter(post => post.id !== id)
        setPosts(filterData)
    }

    return (
        <div className="px-48 py-20">
            <div className="flex justify-between">
                <h1 className="text-3x1 font-bold">Blog Posts</h1>
                <Link href="/posts/create" className="px-4 py-1.5 bg-green-500 rounded text-white">Crear Nuevo Post</Link>
            </div>

            <table className="divide-y divide-gray200 w-full mt-6">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray500 uppercase">ID</th>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray500 uppercase">Title</th>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray500 uppercase">Content</th>
                        <th scope="col" className="px-6 py-3 text-end font-medium text-gray500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td className="px-6 py-3 text-gray-800">{post.id}</td>
                            <td className="px-6 py-3 text-gray-800">{post.title}</td>
                            <td className="px-6 py-3 text-gray-800">{post.content}</td>  
                            <td>
                                <Link href={`/posts/${post.id}?mode=read`}> <button className="text-blue-600 px-2">Read</button></Link>
                                <Link href={`/posts/${post.id}?mode=edit`}><button className="text-blue-600 px-2">Edit</button></Link>
                                <button onClick={ () => handleDelete(post.id)} className="text-red-600">Delete</button>      
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
