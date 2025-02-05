import React from "react";
import { Star, Building, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
  return (
    <div className="relative max-w-[73.75rem] mx-auto">
      <div className=" mx-auto p-[1rem]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-600 text-lg">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="bg-background rounded-[1rem] p-[1rem] flex flex-col md:flex-row gap-[1rem] my-[2rem]">
          {/* Starter Plan */}
          <div className="md:w-[33%] flex-grow flex flex-col text-base-1 bg-white p-[1rem] rounded-[12px] gap-[0.5rem]">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-accent-blue-1" />
              <h1 className="text-[28px] md:text-[32px] font-bold">
                $199
                <span className="text-[0.75rem] font-normal"> / per month </span>
              </h1>
            </div>

            <hr className="w-[100%] border-base-2 mt-[0.5rem] mb-[0.75rem]" />

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Post up to <span className="bg-yellow-200 font-semibold px-1 py-[0.1rem] rounded-sm">10 jobs</span> only
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Advanced analytics dashboard
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Priority email support
              </h3>
            </div>

            <Link
              href={`${process.env.NEXT_PUBLIC_FRONT}/pay/${process.env.NEXT_PUBLIC_PLAN1}`}
              className="button-primary text-center mt-[2rem] bg-white text-accent-blue-1 border border-accent-blue-1 hover:bg-blue-50"
            >
              Get started
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="md:w-[33%] flex-grow flex flex-col text-base-1 bg-white p-[1rem] rounded-[12px] gap-[0.5rem] relative border-2 border-accent-blue-1">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-blue-1 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-6 h-6 text-accent-blue-1" />
              <h1 className="text-[28px] md:text-[32px] font-bold">
                $449
                <span className="text-[0.75rem] font-normal"> / per month </span>
              </h1>
            </div>

            <hr className="w-[100%] border-base-2 mt-[0.5rem] mb-[0.75rem]" />

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Post up to <span className="bg-green-200 font-semibold px-1 py-[0.1rem] rounded-sm">25 jobs</span> only
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Advanced analytics dashboard
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Priority email support
              </h3>
            </div>

            <Link
              href={`${process.env.NEXT_PUBLIC_FRONT}/pay/${process.env.NEXT_PUBLIC_PLAN2}`}
              className="button-primary text-center mt-[2rem] bg-accent-blue-1 text-white hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="md:w-[33%] flex-grow flex flex-col text-base-1 bg-white p-[1rem] rounded-[12px] gap-[0.5rem]">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-accent-blue-1" />
              <h1 className="text-[28px] md:text-[32px] font-bold">
                Custom
                <span className="text-[0.75rem] font-normal"> / contact for pricing </span>
              </h1>
            </div>

            <hr className="w-[100%] border-base-2 mt-[0.5rem] mb-[0.75rem]" />

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Customized job postings
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                Dedicated account manager
              </h3>
            </div>

            <div className="flex gap-[1rem] items-start justify-start">
              <div className="mt-1 w-[1rem] h-[1rem] bg-[#131313] bg-opacity-40 rounded-full text-[#131313] text-[8px] p-[0.25rem] flex justify-center items-center">
                <CheckCircle />
              </div>
              <h3 className="title-sub font-medium text-start">
                24/7 priority support
              </h3>
            </div>

            <a
              href="mailto:hq@getjobs.today"
              className="button-primary text-center mt-auto bg-white text-accent-blue-1 border border-accent-blue-1 hover:bg-blue-50"
            >
              Contact founders
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-20">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to Hire Superfast?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust GetJobs.Today to find their next great hire.
          </p>
          <Link
            href="/postjob"
            className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-accent-blue-1 rounded-[8px] hover:bg-blue-700 transition-colors"
          >
            Post Your First Job
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;