import React from "react";

function CancelPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Return and Cancel Policy</h1>
      <p className="text-sm text-gray-500">Effective Date: 01/06/2025</p>
      <p>
        Thank you for choosing Glocal Solutions. We value your business and
        strive to deliver high-quality services. Please read our Return and
        Cancel Policy carefully before engaging our services.
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          1. Service Cancellation by Client
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Clients may cancel our paid services before work has begun for a
            full refund, minus any non-refundable fees (such as administrative
            or transaction fees, if applicable).
          </li>
          <li>
            Once work has started, cancellations are subject to review, and
            partial refunds may be provided depending on the portion of services
            already rendered.
          </li>
          <li>
            To cancel, clients must submit a written request to{" "}
            <a
              href="mailto:info@glocalsolutions.us"
              className="text-blue-600 underline"
            >
              info@glocalsolutions.us
            </a>{" "}
            with their payment reference number, contact details, and related
            service.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Refund Eligibility</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Refunds are only available if services have not yet been delivered
            or if Glocal Solutions fail to deliver the services as agreed in the
            signed contract or proposal.
          </li>
          <li>
            Completed consulting hours, delivered reports, analysis, or other
            professional services are non-refundable once accepted by the
            client.
          </li>
          <li>
            Prepaid retainers for long-term projects may be partially refunded
            if services are canceled early, based on the unused portion, subject
            to review.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          3. Service Cancellation by Glocal Solutions
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Glocal Solutions reserves the right to cancel services if a client
            violates our terms of service, engages in unethical activities, or
            fails to provide necessary cooperation.
          </li>
          <li>
            In such cases, we will notify the client in writing and may issue a
            prorated refund for any prepaid, unused services, at our discretion.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          4. How to Request a Refund or Cancel
        </h2>
        <p>To request a refund or cancel services, please contact us at:</p>
        <p className="mt-2">
          Email:{" "}
          <a
            href="mailto:info@glocalsolutions.us"
            className="text-blue-600 underline"
          >
            info@glocalsolutions.us
          </a>
          <br />
          Phone: +1 (540) 514-7044
        </p>
        <p className="mt-2">
          Include your name, service reference, reason for cancellation, and any
          supporting details. We aim to respond within 5–7 business days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Payment Disputes</h2>
        <p>
          If you believe you were charged in error, please contact us directly
          before initiating a chargeback or dispute with your bank. We will work
          to resolve any billing issues promptly and fairly.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          6. Changes to This Policy
        </h2>
        <p>
          Glocal Solutions reserves the right to update or modify this
          Return/Cancel Policy at any time. Changes will be posted on our
          website with the effective date.
        </p>
      </section>
    </div>
  );
}

export default CancelPolicyPage;
