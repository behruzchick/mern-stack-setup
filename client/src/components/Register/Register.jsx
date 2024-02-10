import React , {useEffect, useState} from 'react'
import { Form, Container, FloatingLabel,Button ,Toast} from 'react-bootstrap';
import useRegister from '../../hooks/UseRegister';
import { Link } from 'react-router-dom';
function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { registerUser } = useRegister();
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);
    const [errData,setErrData] = useState("");

    useEffect(() => {

    },[errData])
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    const handleSumbit = (e) => {
        e.preventDefault();
        registerUser({email, password,confirmPassword,name,setShowA,setShowB,setErrData});
    };

    return (
        <Form onSubmit={handleSumbit}  style={{ width: '600px', padding: '5%',marginTop:'50px'}} className='shadow-sm rounded bg-light container'>
              <Toast show={showA} onClose={toggleShowA} className='bg-success' style={{position: 'absolute', right: '10px',top:'10px' }}>
                <Toast.Header>
                    <strong className="me-auto">Success!</strong>
                </Toast.Header>
                <Toast.Body>Successfuly joined!</Toast.Body>
            </Toast>
            <Toast show={showB} onClose={toggleShowB} className='bg-danger' style={{position: 'absolute', right: '10px',top:'10px' }}>
                <Toast.Header>
                    <strong className="me-auto">Error!</strong>
                </Toast.Header>
                <Toast.Body>{errData}</Toast.Body>
            </Toast>
            <h2 className='mb-5'>Sign up</h2>
            <Form.Group className='mb2' controlId="formBasicEmail">
                <FloatingLabel
                    label='Email address'
                    controlId='f-email'
                >
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type={'email'} placeholder='Email address' style={{ width: '100%', marginBottom: '15px' }} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb2' controlId="formBasicEmail">
                <FloatingLabel
                    label='Enter name'
                    controlId='f-name'
                >
                    <Form.Control onChange={(e) => setName(e.target.value)} type={'email'} placeholder='Enter name' style={{ width: '100%', marginBottom: '15px' }} />

                </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb2' controlId="formBasicEmail">
                <FloatingLabel
                    label='Enter password'
                    controlId='f-password'
                >
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder='Enter password' style={{ width: '100%', marginBottom: '15px' }} />

                </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb2' controlId="formBasicEmail">
                <FloatingLabel
                    label='Confirm password'
                    controlId='f-password'
                >
                    <Form.Control onChange={(e) => setConfirmPassword(e.target.value)} type={'password'} placeholder='Confirm password' style={{ width: '100%', marginBottom: '15px' }} />

                </FloatingLabel>
                <Container style={{width:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <Button onClick={handleSumbit}>Sumbit</Button>
                </Container>
            </Form.Group>
            <Form.Text>Arleady user? <Link to={'/login'}>Login</Link></Form.Text>
        </Form>
    )
}

export default Register