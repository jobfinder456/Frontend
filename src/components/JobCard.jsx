import React from 'react'
import Link from 'next/link'

function JobCard({jobTitle, companyName, isRemote, loc, id, img}) {

  return (
    <Link href={`/job/${id}`} target='_blank' className="w-[100%] flex justify-between items-center border border-[#87878754] p-[1rem] rounded-[20px]">

                    <div className=" flex items-start justify-start gap-[1rem]">

                      <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] bg-blue-700 overflow-hidden text-center">

                      {img ? (
                              <img
                                src={img}
                                alt="logo"
                                className="w-full h-full object-cover"
                                style={{ objectFit: 'cover' }} // You can set object-fit through inline styles
                              />
                            ) : (
                              <span className="flex items-center justify-center h-full text-white">{companyName[0]}</span> // Adjusted the padding to center vertically
                            )}

                      </div>

                      <div className="flex flex-col justify-start items-start ">

                        <h3 className="text-[1rem] md:text-[20px] font-medium">{jobTitle}</h3>

                        <h5 className="text-[14px] md:text-[1rem] font-normal text-[#13131388]">{companyName}</h5>

                      </div>

                    </div>

                    <h5 className="text-[14px] md:text-[1rem] font-normal text-[#13131388]">{isRemote ? 'Remote' : `${loc}`}</h5>

            </Link>
  )
}

export default JobCard