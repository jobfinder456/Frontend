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
        
       <div className='bg-background flex flex-col md:flex-row flex-wrap mx-auto w-[100%] justify-between gap-[1rem] p-[1rem] rounded-[1rem] text-[1rem] text-base-1'>

            <div className='bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px] md:p-[24px]'>

            <div className='w-[100%] flex flex-col mb-[1rem]'>
                  <h3 className='text-[20px] font-medium'>Company Details</h3>
                  <p>We'll set up a cool analytics dashboard for your job listings.</p>
              </div>

            <div className='flex flex-col flex-grow gap-[0.5rem]'>
                <label htmlFor="companyName" className='form-label'>Company Name</label>
                <input  className='form-inp' 
                        id='companyName'
                        type="text" 
                        placeholder='Pied Piper'
                        value={jobDetails.company_name}
                        onChange={(e) => setJobDetails(prevState => ({ ...prevState, company_name: e.target.value }))} />
            </div>

            <div className='flex flex-col flex-grow gap-[0.5rem]'>
                <label htmlFor="companyWebsite" className='form-label'>Company Website</label>
                <input className='form-inp' 
                        id='companyWebsite'
                       type="text" placeholder='https://:abc.com'
                       value={jobDetails.website}
                       onChange={(e) => setJobDetails(prevState => ({ ...prevState, website: e.target.value }))} />
            </div>

            <div className='flex flex-col w-[100%] gap-[0.5rem]'>
                    <label htmlFor="companyLogo" className='form-label'>Logo</label>
                    <input type="file" name="image" id=""  onChange={handleFileChange}/>
            </div>

            </div>

            <div className='bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px] md:p-[24px]'>

            <div className='flex flex-col w-[100%] rounded-md mb-[1rem]'>
                <h3 className='text-[1.2rem] font-medium'>Job Details</h3>
                <p>Tell us everything about the job you're posting.</p>
            </div>

            <div className='flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between items-center'>

                   <div className='w-[100%] md:w-[65%] flex flex-col gap-[0.5rem]'>
                        <label htmlFor="jobTitle" className='form-label'>Job Title</label>
                        <input className='form-inp' 
                                id='jobTitle' type="text" placeholder='Full STack Software Engineer'
                                value={jobDetails.job_title}
                                onChange={(e) => setJobDetails(prevState => ({ ...prevState, job_title: e.target.value }))} />
                   </div>

                   <div className='w-[100%] md:w-[32%] flex flex-col gap-[0.5rem] '>
                        <label htmlFor="commitment" className='form-label'>Employement Type</label>
                        <select name="commitment" id="commitment" 
                                className='form-inp'
                                value={jobDetails.commitment}
                                onChange={(e) => setJobDetails(prevState => ({ ...prevState, commitment: e.target.value }))}>
                            <option value="Fulltime">FullTime</option>
                            <option value="Internship">Internship</option>
                            <option value="Partime">Part-Time</option>
                            <option value="Contractor">Contractor</option>
                        </select>
                    </div>
            </div>

            <div className='flex flex-col md:flex-row w-[100%] gap-[0.5rem] justify-between items-center'>

                <div className='w-[100%] md:w-[65%] flex flex-col gap-[0.5rem]'>
                     <label htmlFor="location" className='form-label'>Primary Location</label>
                     <input className='form-inp' 
                            id='location' type="text" placeholder='Sillicon Valley'
                            value={jobDetails.work_loc}
                            onChange={(e) => setJobDetails(prevState => ({ ...prevState, work_loc: e.target.value }))} />
                </div>

                <div className='w-[100%] md:w-[32%] flex flex-col gap-[0.5rem] '>
                     <label htmlFor="remote" className='form-label'>Remote ?</label>
                     <select name="remote" id="remote"
                             className='form-inp'
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
                <input className='form-inp'
                       id='url' type="text" placeholder='jobs@company.com'
                       value={jobDetails.job_link}
                       onChange={(e) => setJobDetails(prevState => ({ ...prevState, job_link: e.target.value }))} />
            </div>

            <div className='flex flex-col w-[100%] gap-[0.5rem]'>
                <label htmlFor="jobDesc" className='form-label'>Job Description</label>
                <Tiptap setDesc={handleDescriptionChange} oldDesc={jobDetails.description} />
            </div>

            </div>


            

        {!isEdit && (
            
            <div className='flex-grow bg-white rounded-[12px] flex flex-wrap gap-[1rem] p-[16px] md:p-[24px]'>

            <div className='flex flex-col w-[100%] rounded-md mb-[1rem]'>
                      <h3 className='text-[1.2rem] font-medium'>How can we reach you?</h3>
                      <p>Just for the Get Jobs Today team.</p>
                  </div>
                  
                  <div className='flex flex-col flex-grow gap-[0.5rem]'>
                          <label htmlFor="hrName" className='form-label'>Name</label>
                          <input className='form-inp'
                              id='hrName' type="text"
                              placeholder='Richard Horlicks'
                              value={jobDetails.name}
                              onChange={(e) => setJobDetails(prevState => ({ ...prevState, name: e.target.value }))} />
                      </div><div className='flex flex-col flex-grow gap-[0.5rem]'>
                          <label htmlFor="hrEmail" className='form-label'>Email</label>
                          <input className='form-inp'
                              id='hrEmail' type="text"
                              placeholder='RichardHorlicks@gmail.om'
                              value={jobDetails.email}
                              onChange={(e) => setJobDetails(prevState => ({ ...prevState, email: e.target.value }))} />
                      </div>

                    </div>
            )}


            <div className='w-[100%]'>
                <button onClick={onSubmit}
                        className='w-[100%] bg-accent-blue-1 p-[8px] md:p-[20px] text-[1.2rem] font-medium rounded-[8px] text-white'> {isEdit ? "Update Job" : (
                            <>
                                Post the Job for  <span className='line-through px-[0.2rem]'>$299</span>  $0
                            </>
                        )}</button>
            </div>

        </div>

    </div>
  )
}

export default Form