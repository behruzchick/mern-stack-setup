import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
function App() {



  return (
    <div className="wrape">
      <div className='main'>
        {/* <Home/> */}
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
