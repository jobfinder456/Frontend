import React from 'react'
import Tiptap from './Tiptap';

function Form({onSubmit, setJobDetails, jobDetails, isEdit}) {

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file
        setJobDetails(prevState => ({ ...prevState, image: file }));
      };

      const handleDescriptionChange = (content) => {
        setJobDetails(prevState => ({ ...prevState, description: content }));
    };

  return (
    <div>
        
       <div className='bg-background flex flex-col md:flex-row flex-wrap mx-auto w-[100%] justify-between gap-[1rem] p-[1rem] rounded-[1rem]'>

            <div className='bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px]'>

            <div className='w-[100%] flex flex-col mb-[1rem]'>
                  <h3 className='text-[1.2rem]'>Company Details</h3>
                  <p>We will automatically create a company profile with all your job listings.</p>
              </div>

            <div className='flex flex-col flex-grow gap-[0.5rem]'>
                <label htmlFor="companyName" className='form-label'>Company Name</label>
                <input  className='w-[100%] form-inp' 
                        id='companyName'
                        type="text" 
                        placeholder='Pied Piper'
                        value={jobDetails.company_name}
                        onChange={(e) => setJobDetails(prevState => ({ ...prevState, company_name: e.target.value }))} />
            </div>

            <div className='flex flex-col flex-grow gap-[0.5rem]'>
                <label htmlFor="companyWebsite" className='form-label'>Company Website</label>
                <input className='w-[100%] form-inp' 
                        id='companyWebsite'
                       type="text" placeholder='https://:abc.com'
                       value={jobDetails.website}
                       onChange={(e) => setJobDetails(prevState => ({ ...prevState, website: e.target.value }))} />
            </div>

            <div className='flex flex-col w-[100%] gap-[0.5rem] text-zinc-800'>
                    <label htmlFor="companyLogo" className='form-label'>Logo</label>
                    <input type="file" name="image" id=""  onChange={handleFileChange}/>
            </div>

            </div>

            <div className='bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px]'>

            <div className='flex flex-col w-[100%] rounded-md mb-[1rem]'>
                <h3 className='text-[1.2rem] font-medium'>Job Details</h3>
                <p>Please be as detailed as possible describing the job opening.</p>
            </div>

            <div className='flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between'>

                   <div className='w-[100%] md:w-[65%] flex flex-col gap-[0.5rem]'>
                        <label htmlFor="jobTitle" className='form-label'>Job Title</label>
                        <input className='w-[100%] form-inp' 
                                id='jobTitle' type="text" placeholder='Full STack SOftware Engineer'
                                value={jobDetails.job_title}
                                onChange={(e) => setJobDetails(prevState => ({ ...prevState, job_title: e.target.value }))} />
                   </div>

                   <div className='w-[100%] md:w-[32%] flex flex-col gap-[0.5rem] '>
                        <label htmlFor="commitment" className='form-label'>Employement Type</label>
                        <select name="commitment" id="commitment" 
                                className='w-[100%] form-inp'
                                value={jobDetails.commitment}
                                onChange={(e) => setJobDetails(prevState => ({ ...prevState, commitment: e.target.value }))}>
                            <option value="Fulltime">FullTime</option>
                            <option value="Internship">Internship</option>
                            <option value="Partime">Part-Time</option>
                            <option value="Contractor">Contractor</option>
                        </select>
                    </div>
            </div>

            <div className='flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between'>

                <div className='w-[100%] md:w-[65%] flex flex-col gap-[0.5rem]'>
                     <label htmlFor="location" className='form-label'>Primary Location</label>
                     <input className='w-[100%] form-inp' 
                            id='location' type="text" placeholder='Sillicon Valley'
                            value={jobDetails.work_loc}
                            onChange={(e) => setJobDetails(prevState => ({ ...prevState, work_loc: e.target.value }))} />
                </div>

                <div className='w-[100%] md:w-[32%] flex flex-col gap-[0.5rem] '>
                     <label htmlFor="remote" className='form-label'>Remote ?</label>
                     <select name="remote" id="remote"
                             className='w-[100%] form-inp'
                             value={jobDetails.remote}
                             onChange={(e) => setJobDetails(prevState => ({ ...prevState, remote: e.target.value === 'true' }))}
                    >
                         <option value="true">Yes</option>
                         <option value="false">No</option>
                    </select> 
                </div>

            </div>

            <div className='flex flex-col w-[100%] gap-[0.5rem]'>
                <label htmlFor="url" className='form-label'>Application URL or Public Email</label>
                <input className='w-[100%] form-inp'
                       id='url' type="text" placeholder='jobs@company.com'
                       value={jobDetails.job_link}
                       onChange={(e) => setJobDetails(prevState => ({ ...prevState, job_link: e.target.value }))} />
            </div>

            <div className='flex flex-col w-[100%] gap-[0.5rem]'>
                <label htmlFor="jobDesc" className='form-label'>Job Description</label>
                <Tiptap setDesc={handleDescriptionChange} oldDesc={jobDetails.description} />
            </div>

            </div>


            <div className='flex-grow bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px]'>

        {!isEdit && (
            <><div className='flex flex-col w-[100%] rounded-md my-[1rem]'>
                      <h3 className='text-[1.2rem]'>How can we reach you?</h3>
                      <p>This is just for the Startup Jobs team</p>
                  </div>
                  
                  <div className='flex flex-col flex-grow gap-[0.5rem]'>
                          <label htmlFor="hrName">Name</label>
                          <input className='w-[100%] border-[2px] rounded-md px-[1rem] py-[0.5rem] border-zinc-600'
                              id='hrName' type="text"
                              placeholder='Richard Horlicks'
                              value={jobDetails.name}
                              onChange={(e) => setJobDetails(prevState => ({ ...prevState, name: e.target.value }))} />
                      </div><div className='flex flex-col flex-grow gap-[0.5rem]'>
                          <label htmlFor="hrEmail">Email</label>
                          <input className='w-[100%] border-[2px] rounded-md px-[1rem] py-[0.5rem] border-zinc-600'
                              id='hrEmail' type="text"
                              placeholder='RichardHorlicks@gmail.om'
                              value={jobDetails.email}
                              onChange={(e) => setJobDetails(prevState => ({ ...prevState, email: e.target.value }))} />
                      </div></>
            )}

            </div>

            <div className='w-[100%] flex-grow'>
                <button onClick={onSubmit}
                        className='w-[100%] justify-self-end button-primary'> {isEdit ? "Update Job" : "Post Job for $177"}</button>
            </div>

        </div>

    </div>
  )
}

export default Form