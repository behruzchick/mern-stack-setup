import axios from 'axios';
// import { useState } from 'react';
import { API } from '../API';
const useRegister = () => {
  const registerUser = async ({ email, password,confirmPassword,name,setShowB,setShowA,setErrData }) => {
    axios.post(`${API}/auth/register `,{
        name:name,
        email:email,
        password:password,
        confirmpassword:confirmPassword
    })
    .then((res) => {
        console.log(res);
        setShowA(true)
    }).catch((e) => {
        console.log(e);
        setShowB(true)
        setErrData(e.response.data.message)
    })
  };

  return { registerUser };
};

export default useRegister;
