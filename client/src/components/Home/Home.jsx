import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Button } from "@material-tailwind/react";
import Posts from './Posts';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const param = useParams();
  console.log(param['*']);
  const [user,setUser] = useState({});
    useEffect(() => {
      if(param['*'] === "" || param['*'] === undefined || param['*'] === null){
        return;
      }else{
        axios
        .get(`http://localhost:5000/auth/getUser/${param['*']}`)
        .then((res) => {
          console.log(res);
          setUser(res.data)
        }).catch((e) => {
          console.log(e);
        })
      }
    } , [])
  return (
    <div>
        <Header user={user}/>
        <Posts/>
    </div>
  )
}

export default Home