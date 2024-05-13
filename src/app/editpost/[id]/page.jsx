"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

function Page() {

    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [jobDetails, setJobDetails] = useState({
        company_name: '',
        website: '',
        job_title: '',
        work_loc: '',
        remote: true,
        job_link: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function getJobDetails() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/job/${id}`);
                console.log(response)
                if (response.data.result.length === 0) {
                    setNotFound(true);
                } else {
                    setJobDetails(response.data.result[0]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getJobDetails();
    }, [id]);

    const onSubmit = async () => {
        try {
            const token = localStorage.getItem("jf_token") || false;
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/update/${id}`, jobDetails, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(response);
            router.push(`/job/${id}`)
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (notFound) {
        return <div>404 - Job not found</div>;
    }

    return (
        <div className='max-w-[73.75rem] mx-auto'>

        <Navbar />
        
        <div className='max-w-[980px] mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem] p-[1rem]'>
            <h1 className='pl-[1rem] text-[24px] md:text-[2rem] leading-[2rem] md:leading-[2.5rem] font-light'>Edit your Job Post - <span className='font-medium'>ID {id}</span></h1>
            <Form onSubmit={onSubmit} setJobDetails={setJobDetails} jobDetails={jobDetails} isEdit={true} />
        </div>

        </div>
    );
}

export default Page;
