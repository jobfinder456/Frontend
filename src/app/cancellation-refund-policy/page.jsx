import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <div className="realtive max-w-[73.75rem] mx-auto">
      <Navbar></Navbar>

      <div className="max-w-[54.75rem] mx-auto p-[1rem]">
        <div className=" bg-background rounded-[1rem] p-[1rem] flex flex-col gap-[1rem] my-[2rem] ">
          <h1 className="font-medium">Cancellation and Refund Policy</h1>

          <h2 className="font-medium">Cancellation Policy</h2>
          <p>
            At GetJobs, we value our clients and strive to provide the best
            service possible. We understand that circumstances can change, and
            there may be times when a company decides not to proceed with our
            services. If you wish to cancel your job posting or any other
            service purchased from us, please review our cancellation and refund
            policy below.
          </p>

          <h3 className="font-medium">Cancellation Request:</h3>
          <p>
            To cancel a service, please send an email to{" "}
            <a href="mailto:hq@getjobs.today">hq@getjobs.today</a> within 24
            hours of your purchase. In your email, please include your company
            name, the service you wish to cancel, and the reason for the
            cancellation.
          </p>

          <h2 className="font-medium">Refund Policy</h2>
          <p>
            We are committed to ensuring your satisfaction with our services. If
            you are not completely satisfied, you may be eligible for a refund
            under the following conditions:
          </p>

          <h3 className="font-medium">Eligibility for Refund:</h3>
          <ul>
            <li>
              To qualify for a refund, your cancellation request must be
              received within 24 hours of the purchase of the service.
            </li>
            <li>
              The service must not have been utilized in any capacity. For
              example, if you have already posted a job listing and received
              applications, a refund will not be processed.
            </li>
          </ul>

          <h3 className="font-medium">Refund Process:</h3>
          <ul>
            <li>
              Once we receive your cancellation request, our support team will
              review your case.
            </li>
            <li>
              If your request is approved, we will process the refund within
              7-10 business days. The refund will be issued to the original
              payment method used during the purchase.
            </li>
          </ul>

          <h3 className="font-medium">Non-Refundable Services:</h3>
          <ul>
            <li>
              Any service that has been partially or fully utilized will not be
              eligible for a refund.
            </li>
            <li>
              Administrative fees, setup charges, or any other non-refundable
              fees specified at the time of purchase will not be refunded.
            </li>
          </ul>

          <h3 className="font-medium">Discretionary Refunds:</h3>
          <p>
            In exceptional cases, we may consider refunds outside of the 24-hour
            window or for services that have been partially used. Such refunds
            are at the sole discretion of GetJobs and will be evaluated on a
            case-by-case basis.
          </p>

          <h2 className="font-medium">Contact Us</h2>
          <p>
            If you have any questions about our cancellation and refund policy,
            please contact our support team at:
          </p>
          <p>
            Email: <a href="mailto:hq@getjobs.today">hq@getjobs.today</a>
          </p>
          <p>
            We appreciate your business and are here to assist you with any
            concerns or issues you may have. Thank you for choosing GetJobs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
