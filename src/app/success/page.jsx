"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react';

function Page() {
    const searchParams = useSearchParams()
 
  const search = searchParams.get('jobId')
    

  console.log(search)

    return (
        <div>Page</div>
    );
}

export default Page;