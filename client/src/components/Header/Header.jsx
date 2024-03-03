import React from 'react'
import { Box, Navbar, Tabs } from 'react-bulma-components'
import { Button, MenuItem, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import './Header.css'
const Header = () => {
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
    return (
        <Navbar style={{ padding: "10px" }}>
            <Navbar.Brand>
                <Navbar.Item href='/'>Logo</Navbar.Item>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Item>
                    Item 1
                </Navbar.Item>
                <Navbar.Item>
                    Item 1
                </Navbar.Item>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color={'inherit'}
                >
                    Menu
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Drop item</MenuItem>
                    <MenuItem onClick={handleClose}>Drop item</MenuItem>
                    <MenuItem onClick={handleClose}>Drop item</MenuItem>
                </Menu>
            </Navbar.Menu>
            <Navbar.Container className='responsive-menu'>
                <MenuIcon
                    id="basic-button"
                    aria-controls={mOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={mOpen ? 'true' : undefined}
                    onClick={handleResponsiveClick}
                    color={'inherit'}
                />
                <Menu
                    id="basic-menu"
                    anchorEl={mAnchorEl}
                    open={mOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Item 1</MenuItem>
                    <MenuItem onClick={handleClose}>Item 2</MenuItem>
                    <MenuItem onClick={handleClose}>Item 2</MenuItem>
                </Menu>
            </Navbar.Container>
        </Navbar>
    )
}

export default Header