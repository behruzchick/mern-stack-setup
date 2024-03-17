import axios from 'axios';
import React, { useState } from 'react'
import { Button,Form, Message } from 'react-bulma-components';
import {Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState(false);
    const [err,setErr] = useState("");
    const navigate = useNavigate();

    const handleSumbit = (e) => {
        e.preventDefault();
        // axios.defaults.withCredentials = true;
        axios
        .post("http://localhost:5000/auth/login",{
            name:name,
            password:password
        }).then((res) => {
            setLoading(true);
            navigate(`/${res.data._id}`)
            
        }).catch((e) => {
            console.log(e);
            setErr(e.response.data.message)
            setMessage(true)
        }).finally((res) => {
            setLoading(false)
        })
        
    }
  return (
    <div className='form-wrape'>
        <Message className={message ? 'message' : 'closed'} color={'danger'}>
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
        <Form.Field>
            <Form.Label>
                Name:
                <Form.Input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            </Form.Label>
            <Form.Label>
                Password:   
                <Form.Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
            </Form.Label>
            <Button onClick={handleSumbit} disabled={loading}>Sumbit</Button>
            <p>Don't have any account? <Link to={'/register'}>Register</Link></p>
        </Form.Field>
    </div>
  )
}

export default Login