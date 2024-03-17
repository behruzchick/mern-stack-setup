import React, { useEffect, useState } from 'react'
import { Heading, Image } from 'react-bulma-components'
import './Post.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Posts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      }).catch((e) => {
        console.log(e);
      })
  }, [])

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        // Обрезаем текст до maxLength символов и добавляем многоточие
        return text.slice(0, maxLength) + '...';
    }
}

  return (
    <div className='post-wrape'>
      <div className="new-posts all-posts">
        <Heading>Now</Heading>
        {
          posts
          .filter((post) => {
            const createdAtDate = new Date(post.createdAt);
            const referenceDate = new Date("2024-03-16"); 

            return createdAtDate >= referenceDate
          })
          .map((item) => (
            <Link key={item._id} className="post" to={`/post/${item._id}`}>
              <div className="post_text">
                <Heading subtitle>{item.title}</Heading>
                <p>{truncateText(item.description,700)}</p>
              </div>
              <div className="post_image_wrapper">
                <img className='post-img' src={`http://localhost:5000/image/${item._id}`} />
              </div>
            </Link>
          ))
        }
      </div>
      <div className="posts all-posts">
        <Heading className='my-4'>Posts</Heading>
        
        {


          posts
          .filter((post) => {
            const createdAtDate = new Date(post.createdAt);
            const referenceDate = new Date("2024-03"); 

            return createdAtDate <= referenceDate
          })
          .map((item) => (
            <Link key={item._id} className="post" to={`/post/${item._id}`}>
              <div className="post_text">
                <Heading subtitle>{item.title}</Heading>
                <p>{truncateText(item.description,300)}</p>
              </div>
              <div className="post_image_wrapper">
                <img className='post-img' src={`http://localhost:5000/image/${item._id}`} />
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Posts