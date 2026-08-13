import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Thrift Sharks, including authenticity, liability, and purchase terms.",
};

const UPDATED = "August 11, 2026";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated={UPDATED}>
      <p>
        These Terms of Service (“Terms”) govern your access to and use of the
        Thrift Sharks website, products, and services (collectively, the
        “Services”) operated by Thrift Sharks (“Thrift Sharks,” “we,” “us,” or “our”). By
        browsing, creating an account, placing an order, or otherwise using the
        Services, you agree to these Terms. If you do not agree, do not use the
        Services.
      </p>
      <p className="rounded-sm border border-line bg-surface p-4 text-muted">
        These Terms are a protective template for an online resale business and
        are not a substitute for advice from a licensed attorney. Have counsel
        review them for your jurisdiction and business model before relying on
        them in a dispute.
      </p>

      <LegalSection title="1. Who we are">
        <p>
          Thrift Sharks is an online retailer of pre-owned, vintage, and secondary
          market apparel, footwear, and accessories. Items are sourced from
          individuals, consignors, liquidators, and other third parties. Unless
          expressly stated otherwise, items are not purchased new from brand
          manufacturers or authorized retailers.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <p>
          You must be at least 18 years old (or the age of majority where you
          live) to place an order or create an account. By using the Services,
          you represent that you have legal capacity to enter a binding
          contract.
        </p>
      </LegalSection>

      <LegalSection title="3. Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your login
          credentials and for all activity under your account. Provide accurate
          information and notify us promptly of unauthorized use. We may
          suspend or terminate accounts that violate these Terms or that we
          reasonably believe pose risk to Thrift Sharks, other users, or third parties.
        </p>
      </LegalSection>

      <LegalSection title="4. Products, descriptions, and pricing">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Product photos, titles, brands, sizes, condition notes, and
            descriptions are provided for convenience and may contain errors,
            omissions, or subjective judgments.
          </li>
          <li>
            Pre-owned items may show wear, fading, repairs, odor, missing tags,
            box damage, or other defects consistent with prior use, even when
            not fully described.
          </li>
          <li>
            Prices may change at any time before you complete purchase. We may
            cancel or refuse any order for pricing errors, inventory issues,
            suspected fraud, or legal risk.
          </li>
          <li>
            Colors and details may vary from photos due to lighting, screens,
            and photography.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Authenticity and anti-counterfeit disclaimer (important)">
        <p>
          We take authenticity seriously and may inspect, research, and screen
          items before listing or shipping.{" "}
          <strong className="font-semibold text-foreground">
            However, authentication of secondary-market goods is inherently
            imperfect.
          </strong>{" "}
          Counterfeiters continually improve methods; brand features change;
          documentation can be forged; and even trained reviewers can be
          deceived.
        </p>
        <p>You acknowledge and agree that:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Any statement that an item is “authentic,” “verified,” “legit
            checked,” or similar is a{" "}
            <strong className="font-semibold text-foreground">
              good-faith opinion based on our process at the time of review
            </strong>
            , not an absolute guarantee, warranty, or certification by the
            brand owner.
          </li>
          <li>
            Thrift Sharks is{" "}
            <strong className="font-semibold text-foreground">
              not affiliated with, endorsed by, or an authorized dealer of
            </strong>{" "}
            Nike, Adidas, Supreme, Louis Vuitton, Gucci, Chrome Hearts, BAPE,
            Gallery Dept., Stone Island, or any other brand unless we expressly
            say otherwise in writing.
          </li>
          <li>
            Brand names and logos are used only to identify goods for sale and
            do not imply sponsorship or partnership.
          </li>
          <li>
            Despite screening, an item may later be alleged or determined to be
            counterfeit, replica, unauthorized, mislabeled, or otherwise not
            genuine (“Authenticity Dispute”).
          </li>
          <li>
            If we accidentally list or sell an item that is not genuine, or that
            we later reasonably believe may not be genuine,{" "}
            <strong className="font-semibold text-foreground">
              your sole and exclusive remedy
            </strong>{" "}
            is set out in Section 6 below, to the maximum extent permitted by
            law.
          </li>
        </ul>
        <p>
          Nothing in these Terms requires you to keep a known counterfeit. If
          an Authenticity Dispute arises, contact us promptly and do not resell
          the item pending resolution.
        </p>
      </LegalSection>

      <LegalSection title="6. Exclusive remedies for authenticity and description issues">
        <p>
          If you believe an item is counterfeit, not as described in a material
          way, or otherwise subject to an Authenticity Dispute, you must notify
          us within fourteen (14) days of delivery (or longer if required by
          non-waivable law) and follow our return instructions.
        </p>
        <p>
          After we receive and inspect the item (and, at our option, obtain a
          third-party opinion), we may, at our sole discretion:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>refund the purchase price and original outbound shipping you paid;</li>
          <li>replace the item with a comparable item if available; or</li>
          <li>
            decline the claim if we reasonably conclude the item matches the
            listing or that evidence of inauthenticity is insufficient.
          </li>
        </ul>
        <p>
          <strong className="font-semibold text-foreground">
            To the fullest extent permitted by law, refund or replacement as
            described above is your sole and exclusive remedy
          </strong>{" "}
          for Authenticity Disputes, misdescription, or accidental sale of
          non-genuine goods, whether the claim is based on contract, tort
          (including negligence), strict liability, consumer protection
          statutes, or any other theory. We are not liable for consequential,
          incidental, special, punitive, exemplary, or lost-profit damages;
          reputational harm; costs of third-party authentication you arrange
          without our prior written approval; or claims by brand owners or
          other third parties arising from your purchase or use of an item.
        </p>
        <p>
          If applicable law does not allow limitation of certain warranties or
          damages, our liability is limited to the maximum extent the law
          allows, and in no event more than the amount you paid to Thrift Sharks for the
          specific item giving rise to the claim.
        </p>
      </LegalSection>

      <LegalSection title="7. “As is” condition of pre-owned goods">
        <p>
          Except for any remedy expressly provided in these Terms or required by
          non-waivable law, all products are sold{" "}
          <strong className="font-semibold text-foreground">
            “AS IS” and “AS AVAILABLE,”
          </strong>{" "}
          without warranties of merchantability, fitness for a particular
          purpose, title, quiet enjoyment, or non-infringement, and without any
          warranty that items are new, unworn, defect-free, or genuine beyond
          our good-faith screening process described above.
        </p>
      </LegalSection>

      <LegalSection title="8. Orders, payment, and fraud">
        <p>
          An order is an offer to buy. We may accept, decline, or cancel orders
          before or after payment authorization. You authorize us and our
          payment processors to charge your selected method for the total shown
          at checkout, including taxes and shipping. Suspected fraud, chargeback
          abuse, or stolen-payment use may result in order cancellation, account
          termination, and reporting to relevant parties.
        </p>
      </LegalSection>

      <LegalSection title="9. Shipping and title">
        <p>
          Risk of loss passes to you when we deliver the order to the carrier,
          unless mandatory law provides otherwise. Shipping times are estimates
          only. Customs, duties, and import taxes on international shipments (if
          offered) are your responsibility unless stated otherwise at checkout.
        </p>
      </LegalSection>

      <LegalSection title="10. Returns and cancellations">
        <p>
          Returns are governed by our{" "}
          <a href="/returns" className="underline hover:text-accent">
            Returns Policy
          </a>
          , which is incorporated into these Terms. Final-sale, heavily worn,
          altered, damaged-after-delivery, or incomplete items may be ineligible.
          We may refuse returns that violate the policy. Authenticity-related
          returns follow Section 6.
        </p>
      </LegalSection>

      <LegalSection title="11. Prohibited conduct">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>use the Services for unlawful, fraudulent, or abusive purposes;</li>
          <li>
            scrape, harvest, or reverse engineer the site except as allowed by
            law;
          </li>
          <li>
            interfere with security, rate limits, or other users’ access;
          </li>
          <li>
            submit false authenticity claims, false chargebacks, or return
            fraud (including switching items);
          </li>
          <li>
            resell items obtained through abuse of promotions or pricing errors.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="12. Intellectual property">
        <p>
          The Services, including site design, text, graphics, logos, and
          software, are owned by Thrift Sharks or its licensors. You receive a limited,
          non-exclusive, revocable license to use the Services for personal
          shopping. Brand trademarks appearing in product listings belong to
          their respective owners and are used for identification only.
        </p>
      </LegalSection>

      <LegalSection title="13. Third-party services">
        <p>
          Payment processors, shipping carriers, analytics, hosting, and other
          vendors are third parties. Their terms and privacy practices apply to
          their services. Thrift Sharks is not responsible for third-party outages,
          errors, or security incidents beyond our reasonable control.
        </p>
      </LegalSection>

      <LegalSection title="14. Indemnification">
        <p>
          You will indemnify, defend, and hold harmless Thrift Sharks and its owners,
          officers, employees, contractors, and agents from claims, damages,
          losses, and expenses (including reasonable attorneys’ fees) arising
          out of your misuse of the Services, violation of these Terms, false
          statements, fraudulent returns or chargebacks, or your resale or
          distribution of products purchased from us.
        </p>
      </LegalSection>

      <LegalSection title="15. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Thrift Sharks will not be liable for
          indirect, incidental, special, consequential, exemplary, or punitive
          damages, or any loss of profits, data, goodwill, or business
          opportunities, even if advised of the possibility. Our total
          aggregate liability for any claim relating to the Services or a
          product will not exceed the greater of (a) the amount you paid to Thrift Sharks
          for the product or service at issue in the twelve (12) months before
          the claim, or (b) one hundred U.S. dollars (US $100).
        </p>
      </LegalSection>

      <LegalSection title="16. Dispute resolution; governing law">
        <p>
          These Terms are governed by the laws of the United States and the
          State in which Thrift Sharks maintains its principal place of business,
          without regard to conflict-of-law rules.
        </p>
        <p>
          Before filing a claim, you agree to contact us and attempt informal
          resolution for thirty (30) days. Except where prohibited, disputes
          will be resolved by binding individual arbitration under the rules of
          a mutually agreed arbitration provider, and you waive class actions
          and jury trials to the fullest extent allowed by law. You may bring
          individual claims in small-claims court if eligible. If arbitration
          is not enforceable, exclusive venue lies in state or federal courts
          located in that same State.
        </p>
      </LegalSection>

      <LegalSection title="17. Force majeure">
        <p>
          We are not liable for delays or failures caused by events beyond our
          reasonable control, including natural disasters, war, terrorism,
          labor disputes, utility failures, epidemics, carrier disruptions,
          cyber incidents, or governmental actions.
        </p>
      </LegalSection>

      <LegalSection title="18. Changes">
        <p>
          We may update these Terms at any time by posting a revised version
          with a new “Last updated” date. Continued use after posting
          constitutes acceptance, except where advance notice or consent is
          required by law.
        </p>
      </LegalSection>

      <LegalSection title="19. Severability; entire agreement">
        <p>
          If any provision is held unenforceable, the remainder stays in
          effect. These Terms, plus policies linked from them (including
          Privacy, Returns, Shipping, and Authenticity pages), are the entire
          agreement between you and Thrift Sharks regarding the Services and supersede
          prior understandings on that subject.
        </p>
      </LegalSection>

      <LegalSection title="20. Contact">
        <p>
          For legal or authenticity notices, use the{" "}
          <a href="/contact" className="underline hover:text-accent">
            Contact
          </a>{" "}
          page and include your order number and a detailed description of the
          issue.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
