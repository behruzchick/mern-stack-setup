import React from 'react'
import { Box, Navbar, Tabs } from 'react-bulma-components'
import { Button } from '@material-tailwind/react'
import { useState } from 'react';
import './Header.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Header = ({ user }) => {
    const [dropdownActive, setDropdownActive] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mAnchorEl, setMAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const mOpen = Boolean(mAnchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleResponsiveClick = (event) => {
        setMAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setMAnchorEl(null)
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
        .post(`http://localhost:5000/logout/${user._id}`)
        .then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            navigate('/login')
        })
    }
    return (
        <>
            <Navbar>
                <Navbar.Brand>
                    <Navbar.Item href='/'>React-Blog</Navbar.Item>
                </Navbar.Brand>
                <Navbar.Menu>
                    {user.isLogged ? (
                        <Navbar.Item onClick={handleLogout} href='/login'>Logout</Navbar.Item>

                    ) : (
                        <>
                            <Navbar.Item href='/login'>Login</Navbar.Item>
                            <Navbar.Item href='/register'>Register</Navbar.Item>
                        </>
                    )}

                </Navbar.Menu>
                {user.isAdmin ? (
                    <Navbar>
                        <Navbar.Item href={`/add/post/${user._id}`}>Add Post</Navbar.Item>
                    </Navbar>
                ) : null}
            </Navbar>
        </>
    )
}

export default Header