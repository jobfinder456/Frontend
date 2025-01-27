import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart,
  Building2,
  Users,
  CheckCircle,
  Star,
  Building,
  Briefcase,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative px-[1rem]">
      <Navbar />
      {/* Header 
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="GetJobs.Today Logo" width={32} height={32} className="w-8 h-8" />
            <span className="font-semibold text-xl">GetJobs.Today</span>
          </Link>
          <Link 
            href="/post-job" 
            className="inline-flex items-center justify-center h-10 px-6 font-medium text-white bg-accent-blue-1 rounded-[8px] hover:bg-blue-700 transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </header>
      */}

      {/* Hero Section */}
      <section className="pt-[7rem] pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight">
            Your Hiring,{" "}
            <span className="text-accent-blue-1 font-semibold">Superfast.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Tired of juggling job postings across platforms? Still not getting
            qualified candidates ? Try GetJobs.Today to hire superfast !
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/postjob"
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-accent-blue-1 rounded-[8px] hover:bg-blue-700 transition-colors"
            >
              Post Your First Job
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose GetJobs.Today?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-accent-blue-1" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Effortless Dashboard
              </h3>
              <p className="text-gray-600">
                Stay organized with our user-friendly dashboard. Easily post
                jobs, track views, and manage listings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-accent-blue-1" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Companies</h3>
              <p className="text-gray-600">
                Post jobs for different brands, subsidiaries, or teams from a
                single login. No extra accounts needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent-blue-1" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Company Profile</h3>
              <p className="text-gray-600">
                We generate a sleek company profile that you can link to your
                website. No career page needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-blue-1 mb-2">
                10,000+
              </div>
              <p className="text-gray-600">Monthly Active Job Seekers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-blue-1 mb-2">
                5,000+
              </div>
              <p className="text-gray-600">Job Alerts Sent Monthly</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-blue-1 mb-2">
                2 Weeks
              </div>
              <p className="text-gray-600">Average Time to Hire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-accent-blue-1" />
                <h3 className="text-xl font-semibold">Starter</h3>
              </div>
              <div className="mb-4">
                <div className="text-4xl font-bold">$199</div>
                <div className="text-gray-600">per month</div>
              </div>
              <div className="text-sm text-gray-600 mb-6">
                Perfect for small teams and startups
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Post up to <span className="bg-yellow-200 font-semibold px-1 py-[0.1rem] rounded-sm">10 jobs</span> only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Priority email support</span>
                </li>
              </ul>
              <a href="http://localhost:3000/pay/PoTHJFNlL9SzHX" className="w-full text-center py-3 px-4 bg-white text-accent-blue-1 border border-acbg-accent-blue-1 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get started
              </a>
            </div>

            {/* Growth Plan */}
            <div className="bg-white p-8 rounded-2xl border-2 border-acbg-accent-blue-1 shadow-md hover:shadow-lg transition-shadow relative flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-blue-1 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-6 h-6 text-accent-blue-1" />
                <h3 className="text-xl font-semibold">Growth</h3>
              </div>
              <div className="mb-4">
                <div className="text-4xl font-bold">$449</div>
                <div className="text-gray-600">per month</div>
              </div>
              <div className="text-sm text-gray-600 mb-6">
                Ideal for growing startups and mid-size companies
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Post up to <span className="bg-green-200 font-semibold px-1 py-[0.1rem] rounded-sm">25 jobs</span> only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Priority email support</span>
                </li>
              </ul>
              <a href="http://localhost:3000/pay/PoTI8RZDB76ZyV" className="w-[100%] text-center py-3 px-4 bg-accent-blue-1 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get started
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-6 h-6 text-accent-blue-1" />
                <h3 className="text-xl font-semibold">Enterprise</h3>
              </div>
              <div className="mb-4">
                <div className="text-4xl font-bold">Custom</div>
                <div className="text-gray-600">contact for pricing</div>
              </div>
              <div className="text-sm text-gray-600 mb-6">
                For large organizations with custom needs
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Unlimited job postings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Custom integration options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Custom analytics and reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>24/7 priority support</span>
                </li>
              </ul>
              <button className="mt-auto w-full py-3 px-4 bg-white text-accent-blue-1 border border-acbg-accent-blue-1 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Contact founders
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to Hire Superfast?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust GetJobs.Today to find their
            next great hire.
          </p>
          <Link
            href="/postjob"
            className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-accent-blue-1 rounded-[8px] hover:bg-blue-700 transition-colors"
          >
            Post Your First Job
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/favicon.ico"
                alt="GetJobs.Today Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold text-xl">GetJobs.Today</span>
            </div>
            <div className="text-gray-600">
              © 2024 GetJobs.Today. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
