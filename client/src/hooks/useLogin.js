import axios from 'axios';
import { useState } from 'react';

const useLogin = () => {
  const loginUser = async ({ email, password,setShowA,setShowB ,setErrData}) => {
    const response = await axios.post("http://localhost:5000/auth/login",{
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
