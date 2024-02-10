import React, { useEffect, useState } from 'react';
import { Form, Container, FloatingLabel, Button,Toast } from 'react-bootstrap';
import useLogin from '../../hooks/useLogin';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useLogin();
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);
    const [errData,setErrData] = useState("");
    useEffect(() => {

    },[errData])
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    const handleSumbit = (e) => {
        e.preventDefault();
        loginUser({ email, password,setShowA,setShowB,setErrData});
    };

    return (
        <Form style={{ width: '600px', padding: '5%', marginTop: '50px' }} className='shadow-sm rounded bg-light container' onSubmit={handleSumbit}>
            <Toast show={showA} onClose={toggleShowA} className='bg-success' style={{position: 'absolute', right: '10px',top:'10px' }}>
                <Toast.Header>
                    <strong className="me-auto">Success!</strong>
                </Toast.Header>
                <Toast.Body>Successfuly signed!</Toast.Body>
            </Toast>
            <Toast show={showB} onClose={toggleShowB} className='bg-danger' style={{position: 'absolute', right: '10px',top:'10px' }}>
                <Toast.Header>
                    <strong className="me-auto">Error!</strong>
                </Toast.Header>
                <Toast.Body>{errData}</Toast.Body>
            </Toast>
            <h2 className='mb-5'>Sign</h2>
            <Form.Group className='mb2' controlId="formBasicEmail">
                <FloatingLabel label='Email address' controlId='f-email'>
                    <Form.Control type={'email'} placeholder='Email address' style={{ width: '100%', marginBottom: '15px' }} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb2' controlId="formBasicPassword">
                <FloatingLabel label='Enter password' controlId='f-password'>
                    <Form.Control type={'password'} placeholder='Enter password' style={{ width: '100%', marginBottom: '15px' }} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
                <Container style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button type='submit'>Login</Button>
                </Container>

            </Form.Group>
            <Form.Text>Don't have a account? <Link to={'/register'}>Register</Link></Form.Text>
        </Form>
    );
}

export default Login;
