import type { Metadata } from "next";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { EMAILS, OFFICES } from "@/data/company";

export const metadata: Metadata = {
  title: "Confidentiality & Privacy | IT Heritages",
  description:
    "How IT Heritages collects, uses, shares and protects personal data across its Pakistan and United Kingdom operations.",
};

/**
 * Standard privacy-policy language, written for an enterprise IT consultancy
 * operating in Pakistan and the UK. Deliberately avoids asserting facts that
 * would need verification — no registration numbers, no named DPO, no
 * certification claims, no specific sub-processors.
 */
const LAST_UPDATED = "4 August 2026";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Who we are",
    body: (
      <>
        <p>
          IT Heritages (&ldquo;IT Heritages&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) is a systems integrator delivering infrastructure,
          cloud, cyber security, unified communications and managed services.
          We operate from offices in Islamabad and Lahore, Pakistan, and
          Coventry, United Kingdom.
        </p>
        <p>
          This policy explains what personal data we collect, why we collect it,
          how we use and share it, and the rights available to you. It applies
          to our website, our enquiry and consultation process, and personal
          data we handle while delivering services to clients.
        </p>
      </>
    ),
  },
  {
    heading: "2. Data we collect",
    body: (
      <>
        <p>We collect the following categories of personal data:</p>
        <ul>
          <li>
            <strong>Enquiry data</strong> — the name, company, email address,
            telephone number, preferred contact method and message you submit
            when requesting a consultation or contacting us.
          </li>
          <li>
            <strong>Correspondence</strong> — records of communications between
            you and our team, including email, telephone and meeting notes.
          </li>
          <li>
            <strong>Client engagement data</strong> — contact and role
            information for client personnel involved in a project, together
            with technical documentation produced during delivery.
          </li>
          <li>
            <strong>Technical data</strong> — where our website records it,
            information such as browser type, device type, approximate location
            derived from IP address, and pages visited.
          </li>
          <li>
            <strong>Recruitment data</strong> — where you apply to work with us,
            the information contained in your application.
          </li>
        </ul>
        <p>
          We do not seek to collect special category data (such as health,
          biometric or political data) through our website, and ask that you do
          not submit it in an enquiry.
        </p>
      </>
    ),
  },
  {
    heading: "3. How we use your data",
    body: (
      <>
        <p>We use personal data to:</p>
        <ul>
          <li>respond to enquiries and scope prospective engagements;</li>
          <li>prepare proposals, statements of work and related documentation;</li>
          <li>
            deliver, support and administer contracted services, including
            infrastructure, cloud, security and communications work;
          </li>
          <li>manage our contractual and commercial relationship with clients;</li>
          <li>
            maintain the security and integrity of our own systems and those we
            manage on behalf of clients;
          </li>
          <li>meet legal, regulatory, tax and accounting obligations; and</li>
          <li>
            improve our website and service offering, where our use of technical
            data allows it.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Legal bases for processing",
    body: (
      <>
        <p>
          Where the UK GDPR and Data Protection Act 2018 apply to our processing,
          we rely on the following legal bases:
        </p>
        <ul>
          <li>
            <strong>Legitimate interests</strong> — responding to business
            enquiries, delivering and improving our services, and securing our
            systems, where those interests are not overridden by your rights.
          </li>
          <li>
            <strong>Performance of a contract</strong> — where processing is
            necessary to enter into or carry out an agreement with you or your
            organisation.
          </li>
          <li>
            <strong>Legal obligation</strong> — where we are required to retain
            or disclose information by law.
          </li>
          <li>
            <strong>Consent</strong> — where you have opted in to a specific
            communication. You may withdraw consent at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "5. Client data and confidentiality",
    body: (
      <>
        <p>
          When delivering services we frequently act as a processor on behalf of
          a client, handling data within systems the client controls. In those
          circumstances the client determines the purposes of processing and our
          handling is governed by the engagement contract and any applicable data
          processing terms, alongside this policy.
        </p>
        <p>
          Our engineers work under confidentiality obligations. Access to client
          environments is granted on a least-privilege basis and limited to
          personnel assigned to the engagement.
        </p>
      </>
    ),
  },
  {
    heading: "6. Sharing your data",
    body: (
      <>
        <p>We may share personal data with:</p>
        <ul>
          <li>
            service providers who support our operations, such as hosting,
            communications, and business software vendors, acting on our
            instructions;
          </li>
          <li>
            technology vendors and partners where necessary to deliver, license
            or support a solution you have engaged us for;
          </li>
          <li>
            professional advisers, including legal, insurance and accounting
            advisers; and
          </li>
          <li>
            regulators, law enforcement or other authorities where we are legally
            required to do so.
          </li>
        </ul>
        <p>We do not sell personal data.</p>
      </>
    ),
  },
  {
    heading: "7. International transfers",
    body: (
      <p>
        We operate in both Pakistan and the United Kingdom, and personal data may
        be transferred between those locations and to service providers based
        elsewhere. Where data originating in the UK is transferred outside the
        UK, we take steps to ensure an appropriate level of protection, including
        the use of applicable transfer mechanisms and contractual safeguards.
      </p>
    ),
  },
  {
    heading: "8. Retention",
    body: (
      <p>
        We keep personal data only as long as necessary for the purposes set out
        in this policy. Enquiry data that does not result in an engagement is
        held for a limited period to allow us to follow up. Client and project
        records are retained for the duration of the relationship and afterwards
        for as long as required to meet legal, contractual, tax and accounting
        obligations, or to resolve disputes.
      </p>
    ),
  },
  {
    heading: "9. Security",
    body: (
      <p>
        We maintain technical and organisational measures appropriate to the
        risks presented by our processing, including access control, network and
        endpoint protection, monitoring, and documented delivery practice. No
        method of transmission or storage is completely secure, and we cannot
        guarantee absolute security; where we become aware of a personal data
        breach we will act in accordance with our legal obligations.
      </p>
    ),
  },
  {
    heading: "10. Your rights",
    body: (
      <>
        <p>
          Subject to applicable law, you may have the right to request access to
          the personal data we hold about you; to have inaccurate data corrected;
          to request erasure; to restrict or object to processing; to request
          portability; and to withdraw consent where processing is based on
          consent.
        </p>
        <p>
          To exercise any of these rights, contact us using the details below. We
          may need to verify your identity before responding. If you are in the
          United Kingdom and are not satisfied with our response, you may lodge a
          complaint with the Information Commissioner&apos;s Office.
        </p>
      </>
    ),
  },
  {
    heading: "11. Cookies and website analytics",
    body: (
      <p>
        Our website uses only the cookies necessary for it to function correctly.
        If we introduce analytics or marketing cookies in future, we will update
        this policy and, where required, request your consent before those
        cookies are set. Most browsers allow you to refuse or delete cookies
        through their settings.
      </p>
    ),
  },
  {
    heading: "12. Third-party links",
    body: (
      <p>
        Our website may link to third-party sites, including our social media
        profiles. We are not responsible for the privacy practices or content of
        those sites, and we encourage you to review their policies.
      </p>
    ),
  },
  {
    heading: "13. Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time to reflect changes in our
        practices or legal obligations. The date of the most recent revision is
        shown at the top of this page. Material changes will be highlighted on
        this page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <article className="w-full">
      <header className="relative overflow-hidden border-b border-border/70 bg-background">
        <BackgroundBeams />

        <div className="relative mx-auto w-full max-w-4xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Legal
          </p>
          <AnimatedHeading
            as="h1"
            text="Confidentiality & Privacy"
            className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.04] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 text-lg leading-relaxed text-muted-foreground">
            How we collect, use, share and protect personal data across our
            Pakistan and United Kingdom operations.
          </p>
          <p className="reveal mt-4 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <section className="relative">
        <div className="relative mx-auto w-full max-w-4xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {section.body}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
                14. Contact us
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  For any question about this policy, or to exercise your rights,
                  contact us at{" "}
                  <a
                    href={`mailto:${EMAILS.general}`}
                    className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                  >
                    {EMAILS.general}
                  </a>
                  , or write to us at our registered office:
                </p>
                <address className="not-italic">
                  IT Heritages
                  <br />
                  {OFFICES[0].address}
                  <br />
                  {OFFICES[0].phone}
                </address>
              </div>
            </section>
          </div>
        </div>
      </section>
    </article>
  );
}
