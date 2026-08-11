import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for REUP Resale explaining how we collect, use, and protect personal information.",
};

const UPDATED = "August 11, 2026";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated={UPDATED}>
      <p>
        This Privacy Policy explains how REUP Resale (“REUP,” “we,” “us,” or
        “our”) collects, uses, shares, and protects personal information when
        you use our website and related services (the “Services”). By using the
        Services, you acknowledge this Policy. If you do not agree, do not use
        the Services.
      </p>
      <p className="rounded-sm border border-neutral-200 bg-neutral-50 p-4 text-neutral-600">
        This Policy is a protective template and is not legal advice. Have a
        privacy attorney review it for your locations of operation, payment
        stack, and marketing tools (including CCPA/CPRA, GDPR, and other laws
        that may apply).
      </p>

      <LegalSection title="1. Information we collect">
        <p>We may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-black">Account data:</strong>{" "}
            name, email, password (hashed), and profile details you provide.
          </li>
          <li>
            <strong className="font-semibold text-black">Order data:</strong>{" "}
            shipping and billing address, phone number, items purchased,
            amounts, and order history.
          </li>
          <li>
            <strong className="font-semibold text-black">Payment data:</strong>{" "}
            payment method details are typically processed by third-party
            processors; we generally receive limited payment tokens, status, and
            last-four digits rather than full card numbers.
          </li>
          <li>
            <strong className="font-semibold text-black">
              Communications:
            </strong>{" "}
            messages, authenticity claims, return requests, and support
            correspondence (including photos you send of items).
          </li>
          <li>
            <strong className="font-semibold text-black">
              Device and usage data:
            </strong>{" "}
            IP address, browser type, pages viewed, referring URLs, approximate
            location, and cookies or similar technologies.
          </li>
          <li>
            <strong className="font-semibold text-black">Marketing data:</strong>{" "}
            newsletter signup preferences and campaign engagement if you opt
            in.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How we use information">
        <p>We use personal information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>process orders, payments, shipments, returns, and refunds;</li>
          <li>create and secure accounts;</li>
          <li>
            evaluate authenticity claims, fraud, chargebacks, and policy abuse;
          </li>
          <li>provide customer support and service messages;</li>
          <li>
            improve the site, catalog, inventory decisions, and user experience;
          </li>
          <li>
            send marketing if you opt in (you may unsubscribe anytime);
          </li>
          <li>
            comply with law, enforce our Terms, and protect rights, safety, and
            property;
          </li>
          <li>detect, prevent, and investigate security incidents.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Legal bases (where required)">
        <p>
          If GDPR or similar law applies, we rely on one or more of: performance
          of a contract; legitimate interests (such as security, fraud
          prevention, and service improvement); consent (such as certain
          cookies or marketing); and legal obligation.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies and similar technologies">
        <p>
          We and our providers may use cookies, pixels, and local storage for
          login sessions, cart continuity, analytics, fraud prevention, and (if
          enabled) advertising. You can control cookies through browser
          settings; some features may not work if cookies are blocked.
        </p>
      </LegalSection>

      <LegalSection title="5. How we share information">
        <p>We may share information with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            service providers (hosting, database, email, analytics, customer
            support, authentication tooling);
          </li>
          <li>payment processors and banks;</li>
          <li>shipping carriers and logistics partners;</li>
          <li>
            professional advisors (lawyers, accountants) under confidentiality;
          </li>
          <li>
            authorities or third parties when required by law, subpoena, or to
            protect rights and safety;
          </li>
          <li>
            a buyer or successor in connection with a merger, acquisition,
            financing, or sale of assets;
          </li>
          <li>
            third-party authenticators or experts when investigating an
            authenticity or fraud dispute, limited to what is needed for that
            review.
          </li>
        </ul>
        <p>We do not sell your personal information for money. We do not share it for cross-context behavioral advertising unless we disclose that practice and provide required opt-outs.</p>
      </LegalSection>

      <LegalSection title="6. Retention">
        <p>
          We keep information as long as needed for the purposes above,
          including order records, tax/accounting, dispute resolution, and legal
          compliance. Retention periods vary by data type and legal
          requirements. When no longer needed, we delete or de-identify
          information where feasible.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use reasonable administrative, technical, and organizational
          measures designed to protect personal information. No method of
          transmission or storage is 100% secure. You use the Services at your
          own risk regarding residual security risk.
        </p>
      </LegalSection>

      <LegalSection title="8. Your choices and rights">
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, export, or restrict certain personal information, or to object
          to certain processing, and to appeal a denial. You may also have the
          right to opt out of “sale” or “sharing” of personal information if we
          engage in activities that laws define that way.
        </p>
        <p>
          To exercise rights, contact us via the{" "}
          <a href="/contact" className="underline hover:text-black">
            Contact
          </a>{" "}
          page. We may verify your identity before fulfilling a request. You may
          designate an authorized agent where law allows. Marketing emails
          include an unsubscribe link.
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          The Services are not directed to children under 13 (or under 16 where
          a higher digital-consent age applies). We do not knowingly collect
          personal information from children. If you believe we have, contact us
          and we will take appropriate steps to delete it.
        </p>
      </LegalSection>

      <LegalSection title="10. International transfers">
        <p>
          If you access the Services from outside the country where we process
          data, your information may be transferred to and processed in the
          United States or other countries that may have different data
          protection laws. Where required, we use appropriate transfer
          safeguards.
        </p>
      </LegalSection>

      <LegalSection title="11. Third-party links">
        <p>
          The Services may link to third-party sites or services. Their privacy
          practices are their own; review their policies before providing
          information.
        </p>
      </LegalSection>

      <LegalSection title="12. Authenticity disputes and evidence">
        <p>
          If you submit an authenticity or returns claim, we may retain photos,
          messages, shipping records, and related evidence to investigate fraud,
          protect REUP, and resolve disputes, including accidental listings of
          non-genuine items. This information may be shared with payment
          networks, carriers, insurers, or advisors as needed.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes">
        <p>
          We may update this Policy by posting a revised version with a new
          “Last updated” date. Material changes may be highlighted on the site
          or emailed when appropriate. Continued use after the effective date
          means you accept the updated Policy where permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          Privacy requests and questions: use our{" "}
          <a href="/contact" className="underline hover:text-black">
            Contact
          </a>{" "}
          page with the subject line “Privacy Request.”
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
