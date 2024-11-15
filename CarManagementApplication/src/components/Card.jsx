import React from 'react'
import appwriteService from '../appwrite/databaseConfig'
import { Link } from 'react-router-dom'


function Card(post) {

  const [URL, setURL] = React.useState('');

  if (post) {
    const res = appwriteService.getFilePreview(post.featuredImages);
    res.then((url) => { setURL(url.href); })
  }

  // console.log(URL + " " + post.featuredImages);

  // console.log(post);

  return (
    <Link to={`/post/${post.$id}`}>
      <div
        className="w-full rounded-lg bg-slate-900 text-surface shadow-secondary-1">
        <div className="relative overflow-hidden bg-cover bg-center bg-no-repeat">
          <img
            className="rounded-t-lg mx-auto py-4 px-3 text-white"
            src={URL}
            alt={post.title} />
        </div>
        <div className="py-1 px-3">
          <h2 className='text-xl text-orange-500 text-center font-medium'>{post.title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default Card
