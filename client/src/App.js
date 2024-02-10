import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
function App() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  // const [file, setFile] = useState(null);
  // const [images, setImages] = useState([]);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };



  
  // const createPost = async (fileId) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const response = await axios.post('http://localhost:5000/post', formData)
  //     .catch((e) => {
  //       console.log(e);
  //     })
  
  //     console.log('Post created successfully');
  //     console.log('Server response:', response.data);
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //   }
  // };



  // useEffect(() => {
  //   axios
  //   .get("http://localhost:5000/posts")
  //   .then((res) =>{
  //     console.log(res.data);
  //     setImages(res.data)
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   })
  // },[])


  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
