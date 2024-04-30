"use client"
import Navbar from '@/components/Navbar'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

function page() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [postData, setPostData] = useState([]);
    const [modal, setModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jf_token") || false;
                if(!token){
                  return
                }
                const responseVerify = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/verifyuser`, { headers: { "Authorization": `Bearer ${token}` } });
                setEmail(responseVerify.data.email);
                console.log(responseVerify.data.email);
    
                const responseSubmit = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/users-list`, { email: responseVerify.data.email }, { headers: { "Authorization": `Bearer ${token}` } });
                console.log(responseSubmit);
                setPostData(responseSubmit.data.all);
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
    <div className='w-full min-h-screen relative overflow-hidden'>
        
        <Navbar />

        <Toaster />

        {modal && (
        <div className='fixed bottom-10 w-[80%] mx-auto bg-slate-100 p-[1rem] flex flex-wrap justify-evenly items-center gap-[0.5rem]'>
          <h1 className='text-[1.2rem] w-[100%]'>Are you sure you want to delete the post?</h1>
          <button onClick={() => setModal(false)} className='bg-blue-200 rounded-md text-blue-700 p-[0.5rem]'>No</button>
          <button onClick={() => onDelete(postIdToDelete)} className='bg-red-200 rounded-md text-red-700 p-[0.5rem]'>Yes</button>
        </div>
      )}

        <div className='flex flex-col justify-start items-start gap-[1rem] p-[1rem] md:max-w-[56rem] mx-auto'>

            <h1 className='text-[2rem] md:text-[3rem] text-blue-700 font-medium'>48 <span className='text-[1rem] md:text-[1.2rem] text-black'>total jobs ceated</span></h1>

            <h1 className='text-[2rem] md:text-[3rem] text-blue-700 font-medium'>48 <span className='text-[1rem] md:text-[1.2rem] text-black'>Jobs require payment</span></h1>

            <Link href={'/checkout'} className='px-[1rem] py-[0.5rem] rounded-[10px] bg-blue-700 text-white font-medium text-center'>Pay for all Jobs</Link>

            <div className='overflow-x-scroll w-full'> {/* container scroll chart */}

                <div className='flex flex-col w-[36rem] sm:w-[100%] gap-[1rem] justify-between'>

                    <div className='flex justify-between w-full'>

                        <h3 className='w-[20%]'>Date posted</h3>

                        <h3 className='w-[20%]'>Job Role</h3>

                        <h3 className='w-[20%]'>Payment Status</h3>

                        <h3 className='w-[10%] '></h3>

                        <button className='w-[10%]'></button>

                    </div>

                    {postData.map((post) => (
                        
                        <Link href={`/job/${post.id}`} className='flex justify-between w-full' key={post.id}>

                            <h3 className='w-[20%]'>22-09-24</h3>

                            <h3 className='w-[20%]'>{post.job_title}</h3>

                            <h3 className='w-[20%]'>{post.is_ok ? "Success" : "Payment Needed!"}</h3>

                            <Link href={`/editpost/${post.id}`} className='w-[10%] bg-blue-100 text-blue-600 p-[0.5rem] text-center'>Edit</Link>

                            <button onClick={() => {
                                                   setModal(true);
                                                   setPostIdToDelete(post.id);
                                                 }} className='w-[10%] bg-red-100 text-red-600 p-[0.5rem]'>Delete</button>

                    </Link>) )}


                </div>



            </div>

        </div>

    </div>
  )
}

export default page