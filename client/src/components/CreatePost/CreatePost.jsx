import React, { useState } from 'react'
import axios from 'axios';
import {  Link, useNavigate, useParams } from 'react-router-dom';
import { Button,Form, Message } from 'react-bulma-components';
import './CreatePost.css'
const CreatePost = () => {
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [file,setFile] = useState(null);
    const [description,setDescrition] = useState("");
    const [loading,setLoading] = useState(false);
    const formData = new FormData();
    const navigate = useNavigate();

    const [err,setErr] = useState("");
    const [message,setMessage] = useState(false);
    formData.append('file',file)
    formData.append('title',title)
    formData.append('description',description)
    const handleSumbit = (e) => {
        e.preventDefault();
        if(!title){
           setMessage(true)
           setErr("Please enter post title!")
        }else if(!description){
            setErr("Plese enter post description!")
            setMessage(true)
        }else if(!file){
            setErr("Please enter post image!")
            setMessage(true)
        }else{
            axios
            .post(`http://localhost:5000/post/${id}`,formData)
            .then((res) => {
                setLoading(true);
                navigate(`/${id}`)
            }).catch((e) => {
                console.log(e);
                setErr(e.response.data.message)
            }).finally(() => {
                setLoading(false)
            })
        }
        
    }
  return (
    <div className='form-wrape'>
        <Message>
        <Message className={message ? 'post-message' : 'closed'} color={'danger'}>
                <Message.Header>
                    <span>
                        Erorr!
                    </span>
                    <Button onClick={() => setMessage(false)} remove />
                </Message.Header>
                <Message.Body>
                    <strong>{err}</strong>
                </Message.Body>

        </Message>
        </Message>
        <Form.Field>
            <Form.Label>
                Post title:
                <Form.Input placeholder='Post title' onChange={(e) => setTitle(e.target.value)}/>
            </Form.Label>
            <Form.Label>
                Post description:   
                <Form.Textarea placeholder='Post description' type='password' onChange={(e) => setDescrition(e.target.value)}/>
            </Form.Label>
            <Form.Label>
                Post image:   
                <Form.Input placeholder='Password' type='file' onChange={(e) => setFile(e.target.files[0])}/>
            </Form.Label>
            <Button onClick={handleSumbit} disabled={loading}>Sumbit</Button>
        </Form.Field>
    </div>
  )
}

export default CreatePost