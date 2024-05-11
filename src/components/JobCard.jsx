import React from 'react'
import Link from 'next/link'

function JobCard({jobTitle, companyName, isRemote, loc, id, img}) {

  return (
    <Link href={`/job/${id}`} target='_blank' className="w-[100%] flex justify-between items-center px-[24px] py-[1rem] rounded-[12px] hover:bg-background">

                    <div className=" flex items-start justify-start gap-[1rem]">

                      <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] bg-background overflow-hidden text-center">

                      {img ? (
                              <img
                                src={img}
                                alt="logo"
                                className="w-full h-full object-contain"
                                style={{ objectFit: 'contain' }} // You can set object-fit through inline styles
                              />
                            ) : (
                              <span className="flex items-center justify-center h-full text-white">{companyName[0]}</span> // Adjusted the padding to center vertically
                            )}

                      </div>

                      <div className="flex flex-col justify-start items-start ">

                        <h3 className="text-[1rem] md:text-[20px] font-medium text-base-1">{jobTitle}</h3>

                        <h5 className="text-[14px] md:text-[1rem] font-normal text-base-2">{companyName} <bold className="font-extrabold">·</bold> {isRemote ? 'Remote' : `${loc}`}</h5>

                      </div>

                    </div>

                    <div className='flex items-center justify-center gap-[1rem] text-[1rem]'>

                      <Link href={`/job/${id}`} className='button-secondary'>View</Link>

                      <Link href={'/'} className='button-primary'>Apply Now</Link>

                    </div>

            </Link>
  )
}

export default JobCard