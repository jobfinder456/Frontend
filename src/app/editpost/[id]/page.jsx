"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import { useParams } from 'next/navigation';

function Page() {
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
                const response = await axios.get(`http://localhost:3000/api/v1/job/${id}`);
                if (response.data.result.rows.length === 0) {
                    setNotFound(true);
                } else {
                    setJobDetails(response.data.result.rows[0]);
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
            const response = await axios.put(`http://localhost:3000/api/v1/update/${id}`, jobDetails, { headers: { "Authorization": `Bearer ${token}` } });
            console.log(response);
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
        <div className='max-w-[42rem] mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem] p-[1rem]'>
            <h1 className='text-[1.5rem] md:text-[2rem]'>Edit your Job Post - <span className='text-blue-600 font-medium'>ID {id}</span></h1>
            <Form onSubmit={onSubmit} setJobDetails={setJobDetails} jobDetails={jobDetails} isEdit={true} />
        </div>
    );
}

export default Page;
