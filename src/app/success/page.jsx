"use client"

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function PageContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('jobId');

    console.log(search);

    return (
        <div>Page</div>
    );
}

function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

export default Page;
