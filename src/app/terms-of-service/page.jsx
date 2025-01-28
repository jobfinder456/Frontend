import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <div className="realtive max-w-[73.75rem] mx-auto">
      <div className="max-w-[54.75rem] mx-auto p-[1rem]">
        <div className=" bg-background rounded-[1rem] p-[1rem] flex flex-col gap-[1rem] my-[2rem] ">
          <h1 className="text-[24px] font-medium">Terms and Conditions</h1>
          <p>
            GetJobs.Today is operated by GetJobs. These terms apply to
            GetJobs.Today and any other of GetJobs&apos; sites, apps, accounts
            on any platform, and/or any of its online or offline events or
            properties.
          </p>

          <h4 className="font-medium">Non-legally binding TL;DR:</h4>
          <ul>
            <li>
              <strong>Crowdsourced Content</strong>: GetJobs&apos; sites are
              crowdsourced and have user-generated content, so don&apos;t rely
              on the data.
            </li>
            <li>
              <strong>Liability</strong>: We&apos;re not liable if you get hurt
              because of our site, app, data, or meetups.
            </li>
            <li>
              <strong>Content Contribution</strong>: You allow us to publish the
              stuff you contribute to this site indefinitely.
            </li>
            <li>
              <strong>Feedback</strong>: When providing feedback (through the
              feedback form or any other way), you agree to let us use it to
              improve the site/app.
            </li>
            <li>
              <strong>Data Collection</strong>: We collect analytics data
              including your IP, location, and actions on this site to make it
              better (including through Google and other analytics services).
            </li>
            <li>
              <strong>Personalization</strong>: We also use your IP, location,
              and actions on this site to personalize it (e.g. show you the
              nearest jobs to you).
            </li>
            <li>
              <strong>API/Data Use</strong>: If you use one of our APIs or data,
              you&apos;re required to link back to us on every page or in every
              app screen you use the data on.
            </li>
            <li>
              <strong>Data Republish</strong>: You can only republish our data
              if it&apos;s for non-commercial objectives (e.g. not a
              company/startup).
            </li>
            <li>
              <strong>Refunds</strong>: We reserve the right to deny refund
              requests for any reason.
            </li>
          </ul>

          <h4 className="font-medium">Official Legal Terms:</h4>
          <ol>
            <li>
              <strong>Liability</strong>:
              <p>
                GetJobs accepts no responsibility for any loss, injury, or
                inconvenience resulting from using GetJobs.Today&apos;s websites
                and apps. You should verify critical information.
              </p>
              <p>
                GetJobs accepts no liability or responsibility to any person or
                organization as a consequence of any reliance upon the
                information contained in its sites like GetJobs.Today, and any
                other of its sites and properties.
              </p>
            </li>
            <li>
              <strong>Data Collection</strong>:
              <p>
                We collect data about your browser, IP, location for analytics
                purposes. We also use your location to show you nearby jobs. If
                you contribute content data to the site, you provide us with a
                perpetual license to broadcast, display, distribute, sell, and
                produce derivatives from your contributions.
              </p>
            </li>
            <li>
              <strong>Accuracy</strong>:
              <p>
                Every effort is made to provide information that is accurate.
                However, materials contained in GetJobs.Today&apos;s websites,
                apps, communities, and its properties are subject to change at
                any time by appropriate action of GetJobs. We give no assurance
                or warranty that information on this site is current and take no
                responsibility for matters arising from changed circumstances or
                other information or material which may affect the accuracy or
                currency of information on this site.
              </p>
            </li>
            <li>
              <strong>Copyright</strong>:
              <p>
                Copyright in GetJobs.Today&apos;s websites, apps, communities,
                and its properties rests with GetJobs unless otherwise stated.
              </p>
            </li>
            <li>
              <strong>Content Removal</strong>:
              <p>
                We reserve the right to permanently delete any job post or
                company profile from our websites for content that we deem a bad
                fit. We will be the sole judge of this and we do not offer
                appeals or refunds in those cases.
              </p>
            </li>
            <li>
              <strong>Delayed Transactions</strong>:
              <p>
                In the event a User&apos;s Payment Method was declined, GetJobs
                may attempt to process the transaction again under the same
                conditions as the transaction was initiated by the User, within
                a few days of the User&apos;s first attempt to purchase their
                Membership. Where the Payment Method is approved in such a
                circumstance, the User will receive an email confirming the
                successful completion of their transaction.
              </p>
            </li>
            <li>
              <strong>User-Generated Data</strong>:
              <p>
                Many of our websites, apps, and communities contain
                user-generated data that is subjective, may not be accurate, or
                may be offensive to you. We are not liable for any damages that
                result from using this data.
              </p>
            </li>
            <li>
              <strong>Advice Disclaimer</strong>:
              <p>
                The information posted on our websites, apps, and communities
                should not be considered legal, financial, or other advice and
                is not intended to replace consultation with a qualified
                professional or specific written confirmation from GetJobs. We
                do not answer specific legal or financial questions.
              </p>
            </li>
            <li>
              <strong>Warranty Disclaimer</strong>:
              <p>
                GetJobs.Today&apos;s websites, apps, communities, and its
                properties are provided on an &quot;as is&quot;, &quot;as
                available&quot; basis without warranties of any kind, express or
                implied, including, but not limited to, those of TITLE,
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, or
                NON-INFRINGEMENT or any warranty arising from a course of
                dealing, usage, or trade practice. No advice or written
                information provided shall create a warranty; nor shall members
                or visitors to the site rely on any such information or advice.
                This publication is not intended to be a contract, explicit or
                implied, and GetJobs reserves the right to make changes to the
                information contained.
              </p>
            </li>
            <li>
              <strong>Risk</strong>:
              <p>
                The user assumes all responsibility and risk for the use of
                GetJobs.Today&apos;s websites, apps, communities, and its
                properties and the Internet generally. We accept no liability or
                responsibility to any person or organization as a consequence of
                any reliance upon the information contained in this site. Under
                no circumstances, including negligence, shall anyone involved in
                creating or maintaining GetJobs.Today&apos;s websites, apps,
                communities, and its properties be liable for any direct,
                indirect, incidental, special, or consequential damages, or loss
                profits that result from the use or inability to use the Website
                and/or any other websites which are linked to this site. Nor
                shall they be liable for any such damages including, but not
                limited to, reliance by a member or visitor on any information
                obtained via the Website; or that result from mistakes,
                omissions, interruptions, deletion of files, viruses, errors,
                defects, or failure of performance, communications failure,
                theft, destruction, or unauthorized access. In states or
                countries which do not allow some or all of the above
                limitations of liability, liability shall be limited to the
                greatest extent allowed by law.
              </p>
            </li>
            <li>
              <strong>Software and App Use</strong>:
              <p>
                GetJobs.Today&apos;s software, apps, website, communities, and
                any of its other properties are provided &quot;as is&quot;,
                without warranty of any kind, express or implied, including but
                not limited to the warranties of MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, and NON-INFRINGEMENT. In no event shall the
                authors, owners, or copyright holders be liable for any claim,
                damages, or other liability, whether in an action of contract,
                tort, or otherwise, arising from, out of, or in connection with
                the software or the use or other dealings in the software.
              </p>
            </li>
            <li>
              <strong>Linked Sites</strong>:
              <p>
                We are not responsible for and make no representations or
                warranties as to the contents, goods, or services offered by
                linked sites. If you have any questions or concerns regarding a
                linked site, please contact the linked site directly.
              </p>
            </li>
            <li>
              <strong>Intellectual Property</strong>:
              <p>
                The trademarks, logos, and service marks (&quot;Marks&quot;)
                displayed on GetJobs.Today&apos;s websites, apps, communities,
                and any of its properties are the property of GetJobs or other
                third parties. You are not permitted to use these Marks without
                the prior written consent of GetJobs or such third party which
                may own the Mark.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Page;
