"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function page() {

    const router = useRouter();
    const [userDetails, setUserDetails] = useState({
       email: '',
       password: '',
     });

     const onSubmit = async () => {
       try {
         const response = await axios.post('http://localhost:3000/api/v1/user/login', userDetails);
         localStorage.setItem('jf_token', response.data.token);
         router.push('/dashboard');
       } catch (error) {
         console.error('Login error:', error);
       }
     };

  return (
    <div className="relative mx-auto mt-8 w-80 p-4 rounded-8 text-black flex flex-col justify-center items-center gap-4 shadow-md">
      <input
        type="email"
        id="email"
        autoComplete="on"
        onChange={(e) => setUserDetails((prevState) => ({ ...prevState, email: e.target.value }))}
        placeholder="Email"
      />
      <input
        type="password"
        id="password"
        onChange={(e) => setUserDetails((prevState) => ({ ...prevState, password: e.target.value }))}
        placeholder="Password"
      />
      <button onClick={onSubmit}>Login</button>
    </div>
  )
}

export default page