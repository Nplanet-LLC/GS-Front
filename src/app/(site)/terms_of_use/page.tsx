// import React from 'react'

// function page() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default page

import React from "react";

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="text-sm text-gray-500">Effective Date: 01/06/2025</p>
      <p>
        Welcome to Glocal Solutions. These Terms of Use (“Terms”) govern your
        access to and use of the website located at{" "}
        <a
          href="https://www.glocalsolutions.us"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.glocalsolutions.us
        </a>{" "}
        (the “Site”) operated by Glocal Solutions (“Glocal Solutions,” “we,”
        “us,” or “our”), a company based in the United States.
      </p>
      <p>
        By accessing or using our Site, you agree to be bound by these Terms and
        our <span className="underline">Privacy Policy</span>. If you do not
        agree with these Terms, please do not use our Site.
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
        <p>
          By using this Site, you represent that you are at least 18 years old
          and have the legal capacity to enter into these Terms. If you are
          accessing the Site on behalf of an entity, you represent that you are
          authorized to bind that entity to these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Use of the Site</h2>
        <p>
          You agree to use the Site only for lawful purposes. You agree not to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the Site for any unlawful or fraudulent purpose.</li>
          <li>Access or attempt to access the accounts of other users.</li>
          <li>Transmit viruses, malware, or other harmful code.</li>
          <li>Interfere with the operation of the Site.</li>
          <li>Copy or redistribute any part of the Site without consent.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
        <p>
          All content on the Site is owned by or licensed to Glocal Solutions.
          You may not reproduce, distribute, or create derivative works without
          written permission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. User Submissions</h2>
        <p>
          If you submit any content to the Site, you grant Glocal Solutions a
          non-exclusive, royalty-free, worldwide license to use and distribute
          it. You represent that you have the rights to share it and that it
          does not violate any laws.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. We are not
          responsible for their content or policies. Access them at your own
          risk.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          6. Disclaimer of Warranties
        </h2>
        <p>
          The Site is provided “as is.” We disclaim all warranties, including
          implied warranties of merchantability and fitness for a particular
          purpose.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          7. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, Glocal Solutions shall not be
          liable for indirect, incidental, or consequential damages arising from
          your use of the Site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Glocal Solutions and its
          affiliates from any claims arising from your use of the Site or
          violation of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Virginia. You
          agree to the exclusive jurisdiction of the courts located in Virginia.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          10. Changes to These Terms
        </h2>
        <p>
          We may modify these Terms at any time. Continued use of the Site after
          changes are posted means you accept the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">11. Termination</h2>
        <p>
          We may terminate or suspend your access to the Site at any time,
          without notice or liability.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">12. Contact Information</h2>
        <p>
          If you have any questions, contact us at:
          <br />
          <strong>Glocal Solutions, LLC</strong>
          <br />
          Email:{" "}
          <a
            href="mailto:info@glocalsolutions.us"
            className="text-blue-600 underline"
          >
            info@glocalsolutions.us
          </a>
          <br />
          Phone: +1 (540) 514-7044
          <br />
          Address: P.O. Box 1113 Stephens City, VA 22655
        </p>
      </section>
    </div>
  );
}

export default TermsPage;
