"use client"
import React, {useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

function Page() {

  const router = useRouter()
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/user/signup`, userDetails);
        localStorage.setItem('jf_token', response.data.token);
        router.push('/dashboard');
    } catch (error) {
        console.error('Signup error:', error);
    }
  };

  return (
    <div className='w-[100%] p-[1rem]'>

    <div className="relative mx-auto mt-[2rem] max-w-[32rem] p-[1rem] md:p-[2rem] rounded-[10px] text-black flex flex-col justify-center items-start gap-4 shadow-md">

            <h1 className='text-[1.2rem] md:text-[1.5rem] font-medium'>Craete an account to post Job, Supafast!!</h1>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='name' className=' font-medium'>Name</label>
              <input
                  className='w-[100%] p-[0.5rem] md:p-[1rem] border border-[#13131344] rounded-[4px]'
                  type="text"
                  id="name"
                  autoComplete="on"
                  onChange={(e) => setUserDetails((prevState) => ({ ...prevState, name: e.target.value }))}
                  placeholder="name"
              />

            </div>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='email' className=' font-medium'>Email</label>
              <input
                  className='w-[100%] p-[0.5rem] md:p-[1rem] border border-[#13131344] rounded-[4px]'
                  type="email"
                  id="email"
                  autoComplete="on"
                  onChange={(e) => setUserDetails((prevState) => ({ ...prevState, email: e.target.value }))}
                  placeholder="Email"
              />

            </div>

            <div className='w-[100%] flex flex-col items-start justify-start gap-[0.25rem]'>

              <label htmlFor='password' className=' font-medium'>Password</label>
              <input
                  className='w-[100%] p-[0.5rem] md:p-[1rem] border border-[#13131344] rounded-[4px]'
                  type="password"
                id="password"
                onChange={(e) => setUserDetails((prevState) => ({ ...prevState, password: e.target.value }))}
                placeholder="Password"
              />

            </div>
            
            <button onClick={onSubmit} className=' w-[100%] text-center p-[0.5rem] rounded-[10px] bg-blue-700 text-white font-medium'>Sign Up</button>

            <h3 className='text-[0.95rem] w-[100%] text-center'>Already have an account ? <Link href={'/signin'} className='underline'>Login</Link></h3>

        </div>

        </div>

  )
}

export default Page