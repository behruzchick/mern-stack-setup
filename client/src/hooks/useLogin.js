import axios from 'axios';
import { useState } from 'react';
import { API } from '../API';
const useLogin = () => {
  const loginUser = async ({ email, password,setShowA,setShowB ,setErrData}) => {
    const response = await axios.post(`${API}/auth/login`,{
        email:email,
        password:password
    })
    .then((res) => {
        console.log(res);
        setShowA(true)
    }).catch((e) => {
        console.log(e);
        setErrData(e.response.data.message)
        setShowB(true)
    })
  };

  return { loginUser };
};

export default useLogin;
