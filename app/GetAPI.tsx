export default async function GetAPI() {
    let data = await fetch('https://www.freetogame.com/api/games')
    let posts = await data.json()
    console.log(posts)

    return (
        <ul className="galeria">
            {posts.map((post) => (
                <div>
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <img src={post.thumbnail} alt={post.genre} />
                    </li>
                </div>
            ))}
        </ul>
    )
}
