import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="realtive max-w-[73.75rem] mx-auto">
      <div className="max-w-[54.75rem] mx-auto p-[1rem]">
        <div className=" bg-background rounded-[1rem] p-[1rem] flex flex-col gap-[1rem] my-[2rem] ">
          <h1 className="text-[24px] font-medium">Privacy Policy</h1>

          <h2 className="font-medium">GetJobs Privacy Policy</h2>

          <h3 className="font-medium">Introduction</h3>
          <p>
            GetJobs is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website GetJobs.Today or use our
            services.
          </p>

          <h3 className="font-medium">Information We Collect</h3>
          <ul>
            <li>
              <strong>Personal Information</strong>: We may collect personally
              identifiable information, such as your name, email address, phone
              number, and location.
            </li>
            <li>
              <strong>Non-Personal Information</strong>: We may collect
              non-personal information such as browser type, operating system,
              IP address, and browsing behavior.
            </li>
          </ul>

          <h3 className="font-medium">How We Use Your Information</h3>
          <ul>
            <li>
              <strong>To Provide Services</strong>: We use your information to
              operate, maintain, and improve our services, including
              personalizing job recommendations and other content.
            </li>
            <li>
              <strong>Communication</strong>: We use your email address or phone
              number to send you updates, newsletters, and other relevant
              information.
            </li>
            <li>
              <strong>Analytics</strong>: We use data for analytics to
              understand how our services are used and to improve them.
            </li>
            <li>
              <strong>Advertising</strong>: We may use your information to show
              you targeted advertisements based on your interests and
              activities.
            </li>
          </ul>

          <h3 className="font-medium">How We Share Your Information</h3>
          <ul>
            <li>
              <strong>With Your Consent</strong>: We may share your information
              with third parties when we have your consent to do so.
            </li>
            <li>
              <strong>Service Providers</strong>: We may share information with
              third-party vendors and service providers who perform services on
              our behalf.
            </li>
            <li>
              <strong>Legal Requirements</strong>: We may disclose your
              information if required to do so by law or in response to valid
              requests by public authorities.
            </li>
          </ul>

          <h3 className="font-medium">Cookies and Tracking Technologies</h3>
          <ul>
            <li>
              <strong>Cookies</strong>: We use cookies to track your use of our
              website and services to enhance your experience.
            </li>
            <li>
              <strong>Third-Party Tracking</strong>: We may allow third-party
              service providers to use cookies and other tracking technologies
              to collect and analyze data about your use of our website.
            </li>
          </ul>

          <h3 className="font-medium">Data Security</h3>
          <p>
            We implement reasonable security measures to protect your
            information from unauthorized access, disclosure, alteration, and
            destruction. However, no data transmission over the internet can be
            guaranteed as totally secure.
          </p>

          <h3 className="font-medium">Your Rights and Choices</h3>
          <ul>
            <li>
              <strong>Access and Update</strong>: You have the right to access
              and update your personal information.
            </li>
            <li>
              <strong>Opt-Out</strong>: You may opt out of receiving promotional
              communications from us by following the unsubscribe link or
              instructions provided in any email we send.
            </li>
            <li>
              <strong>Data Deletion</strong>: You may request the deletion of
              your personal information by contacting us.
            </li>
          </ul>

          <h3 className="font-medium">Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
