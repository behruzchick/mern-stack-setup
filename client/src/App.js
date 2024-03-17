import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import { Button } from '@material-tailwind/react';
import Login from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import Post from './components/PostComponents/Post';
import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
function App() {



  return (
    <div className="wrape">
      <div className='main'>
        {/* <Header/> */}
        <Routes>  
            <Route path='/*' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/post/:id' element={<Post/>}/>
            <Route path='/add/post/:id' element={<CreatePost/>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
