"use client"
import Navbar from '@/components/Navbar'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { RxExternalLink } from "react-icons/rx";

function Page() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [postData, setPostData] = useState([]);
    const [modal, setModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [notLive, setNotLive] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jf_token") || false;
                if(!token){
                  router.push('/signin')
                  return
                }
                const responseVerify = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/verifyuser`, { headers: { "Authorization": `Bearer ${token}` } });
                setEmail(responseVerify.data.email);
                console.log(responseVerify.data.email);
    
                const responseSubmit = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/users-list`, { email: responseVerify.data.email }, { headers: { "Authorization": `Bearer ${token}` } });
                console.log(responseSubmit);
                setPostData(responseSubmit.data.all.jobResult);
                setNotLive(responseSubmit.data.all.is_ok)
            } catch (error) {
                console.error("Error:", error);
                toast('Please login again')
            }
        };
    
        fetchData();
    }, []);

    const onDelete = async (id) => {
        console.log(id)
        try {
          const token = localStorage.getItem("jf_token") || false;
          const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` }} );
          console.log(response);
          // After deleting, close the modal and reset postIdToDelete
          setModal(false);
          setPostIdToDelete(null);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='max-w-[73.75rem] mx-auto min-h-screen relative overflow-hidden'>
        
        <Navbar />

        <Toaster />

        {modal && (
        <div className='fixed bottom-10 w-[80%] mx-auto bg-slate-100 p-[1rem] flex flex-wrap justify-evenly items-center gap-[0.5rem]'>
          <h1 className='text-[1.2rem] w-[100%]'>Are you sure you want to delete the post?</h1>
          <button onClick={() => setModal(false)} className='bg-blue-200 rounded-md text-blue-700 p-[0.5rem]'>No</button>
          <button onClick={() => onDelete(postIdToDelete)} className='bg-red-200 rounded-md text-red-700 p-[0.5rem]'>Yes</button>
        </div>
      )}

        <div className='flex flex-col justify-start items-start gap-[4rem] p-[20px]'>

          <div className='w-[100%] bg-background flex flex-wrap gap-[0.5rem] md:gap-[1rem] p-[0.5rem] md:p-[1rem] rounded-[24px]'>

            <div className='bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]'>

              <h3 className='text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1'>29.3K</h3>
              <span className='text-[14px] md:text-[16px]'>Total impressions on your job posts</span>

            </div>

            <div className='bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]'>

              <h3 className='text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1'>{postData.length - notLive}</h3>
              <span className='text-[14px] md:text-[16px]'>Jobs are live now</span>

            </div>

            <div className='bg-white flex-grow flex flex-col items-start justify-center rounded-[1rem] p-[0.75rem] md:p-[2rem]'>

              <h3 className='text-[2.5rem] md:text-[4rem] font-medium text-accent-blue-1'>{notLive}</h3>
              <span className='text-[14px] md:text-[16px]'>Jobs require payment. <Link href={'/checkout'} className='flex items-center gap-[0.5rem] underline'>Pay Now <RxExternalLink /></Link></span>

            </div>



          </div>

            <div className='relative overflow-x-scroll w-full'> {/* container scroll chart */}

                <div className='flex flex-col w-[36rem] sm:w-[100%] justify-between'>

                    <div className='flex justify-start items-center w-full bg-background rounded-[1rem] px-[24px] py-[1rem] mb-[1rem] md:mb-[2rem] text-[1rem]'>

                        <h3 className='w-[15%] text-start'>Date posted</h3>

                        <h3 className='w-[25%] text-start'>Job Role</h3>

                        <h3 className='w-[20%] text-start'>Payment Status</h3>

                    </div>

                    {postData.length > 0 && postData.map((post) => (
                        
                        <div className='relative z-10 flex justify-start items-center w-full px-[24px] py-[0.5rem] hover:bg-background active:bg-background rounded-[8px] text-[1rem]' key={post.id}>

                            <h3 className='w-[15%] text-start'>22-09-24</h3>

                            <Link href={`/job/${post.id}`} className='w-[25%] text-start font-medium flex items-center gap-[0.5rem]'>{post.job_title} </Link>

                            <Link href={'/checkout'} className='w-[20%] text-start flex items-center gap-[0.5rem]'>
                                {post.is_ok ? "Success" : (
                                    <>
                                        Payment Needed!
                                        <RxExternalLink />
                                    </>
                                )}
                            </Link>

                            <div className='z-50 flex-grow flex justify-end items-center gap-[1rem]'>

                                <button onClick={() => router.push(`/editpost/${post.id}`)} className=' bg-accent-blue-2 text-accent-blue-1 p-[12px] rounded-[0.5rem]'>Edit</button>

                                <button onClick={() => {
                                   setModal(true);
                                   setPostIdToDelete(post.id);
                                 }} className=' bg-accent-red-2 text-accent-red-1 p-[12px] rounded-[0.5rem]'>Delete</button>

                            </div>


                    </div>) )}


                </div>



            </div>

        </div>

    </div>
  )
}

export default Page