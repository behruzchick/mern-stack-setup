import React, { useEffect, useState } from 'react'
import './Post.css'
import { useParams } from 'react-router-dom'
import { Heading,Image } from 'react-bulma-components';
import axios from 'axios';
const Post = () => {

    const {id} = useParams();

    const [post,setPost] = useState({});
    useEffect(() => {
      axios
      .get(`http://localhost:5000/getPost/${id}`)
      .then((res) => {
        console.log(res);
        setPost(res.data)
      }).catch((e) => {
        console.log(e);
      })
    },[])
    
  return (
    <div className='post-wrape'>
        <div className="post_info">
            <Heading>{post.title}</Heading>
            <Image className='post_img' src={`http://localhost:5000/image/${post._id}`} />
            <Heading className='my-3' subtitle >{post.description}</Heading>
        </div>
    </div>
  )
}

export default Post