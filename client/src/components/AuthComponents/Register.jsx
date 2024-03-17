import { Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Button, Form } from 'react-bulma-components'
import './Form.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSumbit = (e) => {
        e.preventDefault();
    
        axios
        .post("http://localhost:5000/auth/register",{
            name:name,
            surname:surname,
            password:password
        }).then((res) => {
            setLoading(true);
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            navigate('/')
            setLoading(false)
        })
        
    }
  return (
    <div className='form-wrape'>
        <Form.Field>
            <Form.Label>
                Name:
                <Form.Input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            </Form.Label>
            <Form.Label>
                Surname:   
                <Form.Input placeholder='Surname' onChange={(e) => setSurname(e.target.value)}/>
            </Form.Label>
            <Form.Label>
                Password:   
                <Form.Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
            </Form.Label>
            <Button onClick={handleSumbit} disabled={loading}>Sumbit</Button>
            <p>Arleady have a account? <Link to={'/login'}>Login</Link></p>
        </Form.Field>
    </div>
  )
}

export default Register