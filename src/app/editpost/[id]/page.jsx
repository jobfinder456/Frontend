"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Form from '@/components/Form';
import { useParams } from 'next/navigation'

function page() {
    const params = useParams()
    const id = params.id
    const [jobDetails, setJobDetails] = useState({
        company_name: '',
        website: '',
        job_title: '',
        work_loc: '',
        remote: true,
        job_link: '',
        description: ''
    });

    useEffect(() => {
        async function get() {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:3000/api/v1/job/${id}`)
                setJobDetails(response.data.result.rows[0])
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        get()
    }, [])
    
    const onSubmit = async() => {
        try {
            const token = localStorage.getItem("jf_token") || false;
            const response = await axios.put(`http://localhost:3000/api/v1/update/${id}`, jobDetails, { headers: { "Authorization": `Bearer ${token}` } })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-[42rem] mx-auto my-[2rem] flex flex-col items-start justify-center gap-[1rem]'>
        
        <h1 className='text-[2rem]'>Edit your Job Post - <span className='text-blue-600 font-medium'>ID {id}</span></h1>

        <Form onSubmit={onSubmit} setJobDetails={setJobDetails} jobDetails={jobDetails} isEdit={true}/>

    </div>
  )
}

export default page