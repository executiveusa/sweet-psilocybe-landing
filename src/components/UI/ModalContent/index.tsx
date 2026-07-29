"use client";
import React from "react";

interface ModalContentProps {
  type: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({ type }) => {
  switch (type) {
    case "privacy":
      return (
        <div>
          <h3>Privacy Policy</h3>
          <p>Last updated: November 9, 2025</p>

          <h3>Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you:
          </p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Participate in our educational content</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide educational content about psilocybin research</li>
            <li>Send newsletters and updates (with your consent)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our website and educational materials</li>
          </ul>

          <h3>Data Protection</h3>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction.
          </p>

          <h3>Third-Party Services</h3>
          <p>
            We may use third-party services (such as analytics providers) to
            help us analyze website usage. These services have their own privacy
            policies.
          </p>

          <h3>Age Restriction</h3>
          <div className="disclaimer">
            <h4>Important</h4>
            <p>
              This website is intended for individuals 18 years of age and
              older. We do not knowingly collect information from minors.
            </p>
          </div>

          <h3>Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@sweetpsilocybe.com
          </p>
        </div>
      );

    case "terms":
      return (
        <div>
          <h3>Terms of Use</h3>
          <p>Last updated: November 9, 2025</p>

          <h3>Educational Purpose</h3>
          <p>
            Sweet Psilocybe is an educational platform providing information
            about psilocybin research. We do not provide medical advice, legal
            advice, or sell psilocybin mushrooms.
          </p>

          <h3>Age Restriction</h3>
          <p>
            You must be at least 18 years old to use this website. By using this
            site, you confirm that you are 18 or older.
          </p>

          <h3>Content Accuracy</h3>
          <p>
            While we strive to provide accurate information, we make no
            warranties about the completeness, reliability, or accuracy of the
            content. Always consult with qualified professionals.
          </p>

          <h3>No Medical Advice</h3>
          <div className="disclaimer">
            <h4>Medical Disclaimer</h4>
            <p>
              The information provided is for educational purposes only and
              should not be considered medical advice. Always consult with a
              healthcare professional before making any health-related
              decisions.
            </p>
          </div>

          <h3>Legal Compliance</h3>
          <p>
            You are responsible for complying with all applicable local, state,
            and federal laws in your jurisdiction. Psilocybin laws vary
            significantly by location.
          </p>

          <h3>Prohibited Use</h3>
          <p>
            You may not use this site for any illegal activities or to encourage
            illegal behavior.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            We shall not be liable for any indirect, incidental, special, or
            consequential damages arising from your use of this website.
          </p>
        </div>
      );

    case "disclaimers":
      return (
        <div>
          <h3>Disclaimers</h3>
          <p>Last updated: November 9, 2025</p>

          <h3>Educational Content Only</h3>
          <p>
            All content on this website is provided for educational and
            informational purposes only. We do not provide medical, legal, or
            professional advice.
          </p>

          <h3>Age Restriction Notice</h3>
          <div className="disclaimer">
            <h4>18+ Only</h4>
            <p>
              This website contains educational information about psilocybin and
              is restricted to adults 18 years and older. Access to this site
              requires age verification.
            </p>
          </div>

          <h3>No Medical Claims</h3>
          <p>
            We make no claims about the therapeutic or medical benefits of
            psilocybin. Any research references are for educational purposes
            only.
          </p>

          <h3>Legal Variations</h3>
          <p>
            Psilocybin laws vary significantly by jurisdiction. What may be
            legal in one location may be illegal in another. Always check local
            laws.
          </p>

          <h3>No Sales or Distribution</h3>
          <p>
            We do not sell, distribute, or facilitate the sale of psilocybin
            mushrooms or any controlled substances. This is an educational
            platform only.
          </p>

          <h3>Individual Results Vary</h3>
          <p>
            Individual responses to any information or approaches discussed may
            vary. What works for one person may not work for another.
          </p>

          <h3>Professional Consultation</h3>
          <p>
            Always consult with qualified healthcare professionals, legal
            advisors, and other qualified professionals for personalized advice.
          </p>

          <h3>Research References</h3>
          <p>
            While we reference legitimate research, we are not responsible for
            the accuracy of third-party studies or the outcomes of any research
            mentioned.
          </p>
        </div>
      );

    case "mission":
      return (
        <div>
          <h3>Our Mission</h3>

          <p>
            At Sweet Psilocybe, we are dedicated to providing evidence-based,
            educational information about psilocybin research and its potential
            applications in mental health and wellness.
          </p>

          <h3>Education First</h3>
          <p>
            We believe that accurate, science-based information is crucial for
            public understanding. Our platform serves as a hub for:
          </p>
          <ul>
            <li>Summarizing peer-reviewed research on psilocybin</li>
            <li>Providing harm reduction education</li>
            <li>Sharing information about ongoing clinical trials</li>
            <li>Promoting responsible discussion of psychedelic research</li>
          </ul>

          <h3>Our Values</h3>
          <div className="highlight">
            <p>
              <strong>Science-Based:</strong> We rely on peer-reviewed research
              and evidence.
            </p>
            <p>
              <strong>Responsible:</strong> We promote harm reduction and legal
              compliance.
            </p>
            <p>
              <strong>Accessible:</strong> We make complex research
              understandable to everyone.
            </p>
            <p>
              <strong>Ethical:</strong> We support research that benefits
              society.
            </p>
          </div>

          <h3>What We Don't Do</h3>
          <p>We do not:</p>
          <ul>
            <li>Sell or distribute psilocybin mushrooms</li>
            <li>Provide medical or legal advice</li>
            <li>Encourage illegal activities</li>
            <li>Make unsupported health claims</li>
          </ul>

          <h3>Community Impact</h3>
          <p>
            We support the broader psychedelic research community by raising
            awareness, promoting scientific literacy, and fostering informed
            discussions about the future of psychedelic medicine.
          </p>
        </div>
      );

    case "research":
      return (
        <div>
          <h3>Research Partners</h3>

          <p>
            We are committed to supporting legitimate, peer-reviewed research in
            psilocybin and related areas. Here are some of the organizations we
            respect and follow:
          </p>

          <h3>Academic Institutions</h3>
          <ul>
            <li>
              <strong>
                Johns Hopkins Center for Psychedelic and Consciousness Research
              </strong>{" "}
              - Leading research on psilocybin for depression, anxiety, and
              addiction
            </li>
            <li>
              <strong>NYU Grossman School of Medicine</strong> - Pioneering
              clinical trials in psilocybin therapy
            </li>
            <li>
              <strong>Imperial College London</strong> - Advancing psychedelic
              science in the UK
            </li>
            <li>
              <strong>University of California, San Francisco (UCSF)</strong> -
              Research on psilocybin for end-of-life anxiety
            </li>
          </ul>

          <h3>Research Organizations</h3>
          <ul>
            <li>
              <strong>
                MAPS (Multidisciplinary Association for Psychedelic Studies)
              </strong>{" "}
              - Nonprofit research and education organization
            </li>
            <li>
              <strong>Heffter Research Institute</strong> - Funding research on
              psilocybin for mental health
            </li>
            <li>
              <strong>Beckley Foundation</strong> - UK-based psychedelic
              research organization
            </li>
          </ul>

          <h3>Clinical Trial Databases</h3>
          <p>For the latest research developments, we recommend consulting:</p>
          <ul>
            <li>ClinicalTrials.gov - US clinical trials database</li>
            <li>ISRCTN Registry - International clinical trials database</li>
            <li>PubMed - Scientific literature database</li>
          </ul>

          <div className="disclaimer">
            <h4>Important Note</h4>
            <p>
              We are not affiliated with any of these organizations. We simply
              respect and follow their work as trusted sources of scientific
              information.
            </p>
          </div>

          <h3>Stay Informed</h3>
          <p>
            Subscribe to our newsletter to receive updates on the latest
            research developments and educational content.
          </p>
        </div>
      );

    case "contact":
      return (
        <div>
          <h3>Contact Us</h3>

          <p>
            We welcome your questions, feedback, and suggestions. Please note
            that we cannot provide medical or legal advice through our contact
            channels.
          </p>

          <h3>General Inquiries</h3>
          <p>
            <strong>Email:</strong> contact@sweetpsilocybe.com
          </p>
          <p>
            <strong>Response Time:</strong> We typically respond within 2-3
            business days
          </p>

          <h3>Media and Press</h3>
          <p>
            <strong>Email:</strong> media@sweetpsilocybe.com
          </p>

          <h3>Research and Collaboration</h3>
          <p>
            <strong>Email:</strong> research@sweetpsilocybe.com
          </p>
          <p>For research collaboration inquiries and scientific discussions</p>

          <h3>Frequently Asked Questions</h3>
          <p>
            Before contacting us, please check our FAQ section as it may already
            answer your question.
          </p>

          <h3>What We Can Help With</h3>
          <ul>
            <li>Questions about our educational content</li>
            <li>Technical issues with the website</li>
            <li>Media and press inquiries</li>
            <li>Suggestions for content improvements</li>
            <li>Research collaboration opportunities</li>
          </ul>

          <h3>What We Cannot Help With</h3>
          <div className="disclaimer">
            <h4>Limitations</h4>
            <ul>
              <li>Medical or health advice</li>
              <li>Legal advice or guidance</li>
              <li>Personal therapeutic guidance</li>
              <li>Information about obtaining psilocybin</li>
              <li>Individual case consultations</li>
            </ul>
          </div>

          <h3>Follow Us</h3>
          <p>
            Stay updated with our latest educational content and research
            summaries through our newsletter and social media channels.
          </p>
        </div>
      );

    case "safety":
      return (
        <div>
          <h3>Safety Information</h3>

          <p>
            Safety is our top priority. While we provide educational
            information, we strongly emphasize the importance of safety and harm
            reduction.
          </p>

          <h3>General Safety Principles</h3>
          <div className="highlight">
            <p>
              <strong>Never use alone:</strong> Always have a trusted, sober
              person present
            </p>
            <p>
              <strong>Start low and go slow:</strong> Begin with the smallest
              effective dose
            </p>
            <p>
              <strong>Set and setting:</strong> Ensure you're in a safe,
              comfortable environment
            </p>
            <p>
              <strong>Medical screening:</strong> Consult healthcare providers
              for contraindications
            </p>
          </div>

          <h3>Medical Contraindications</h3>
          <p>
            Psilocybin may not be safe for individuals with certain conditions:
          </p>
          <ul>
            <li>Active psychosis or severe mental health conditions</li>
            <li>Recent use of certain medications (MAOIs, lithium, etc.)</li>
            <li>History of heart conditions or high blood pressure</li>
            <li>Pregnancy or breastfeeding</li>
          </ul>

          <h3>Drug Interactions</h3>
          <p>Psilocybin can interact dangerously with many substances:</p>
          <ul>
            <li>MAOIs (certain antidepressants)</li>
            <li>Lithium</li>
            <li>Tramadol and other serotonergic drugs</li>
            <li>Alcohol and other depressants</li>
          </ul>

          <h3>Harm Reduction Resources</h3>
          <ul>
            <li>
              <strong>PsychonautWiki:</strong> Comprehensive safety information
            </li>
            <li>
              <strong>Erowid:</strong> Educational resource on psychoactive
              substances
            </li>
            <li>
              <strong>Zendo Project:</strong> Harm reduction at music festivals
            </li>
          </ul>

          <h3>Emergency Situations</h3>
          <div className="disclaimer">
            <h4>In Case of Emergency</h4>
            <p>
              If you or someone else is experiencing a medical emergency related
              to substance use, call emergency services immediately (911 in the
              US).
            </p>
            <p>For psychological support, contact crisis helplines:</p>
            <ul>
              <li>988 Suicide & Crisis Lifeline (US)</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
            </ul>
          </div>

          <h3>Legal Considerations</h3>
          <p>
            Always research and comply with local laws. Legal status varies
            significantly by jurisdiction.
          </p>

          <h3>Professional Guidance</h3>
          <p>
            Consider working with trained therapists or guides if you're
            interested in exploring psilocybin therapeutically. Clinical trials
            provide the safest supervised environment.
          </p>
        </div>
      );

    case "research-hub":
      return (
        <div>
          <h3>Research Hub</h3>

          <p>
            Explore the latest scientific research and developments in
            psilocybin studies. Our research hub curates the most important
            findings for easy understanding.
          </p>

          <h3>Recent Research Highlights</h3>

          <h4>Depression and Anxiety</h4>
          <p>
            Recent studies continue to show promising results for
            psilocybin-assisted therapy in treating major depressive disorder
            and treatment-resistant depression.
          </p>
          <ul>
            <li>
              Johns Hopkins 2024 study: 75% response rate in depression patients
            </li>
            <li>
              Imperial College London 2024: Neural mechanisms of psilocybin
              therapy
            </li>
          </ul>

          <h4>Addiction Treatment</h4>
          <p>
            Clinical trials are exploring psilocybin for smoking cessation,
            alcohol use disorder, and other addictions.
          </p>
          <ul>
            <li>NYU 2024: 80% success rate in smoking cessation trial</li>
            <li>Johns Hopkins 2024: Alcohol use disorder study results</li>
          </ul>

          <h4>End-of-Life Care</h4>
          <p>
            Research shows psilocybin can significantly reduce anxiety and
            improve quality of life for patients with terminal illnesses.
          </p>

          <h3>Clinical Trial Database</h3>
          <p>Stay updated on ongoing clinical trials:</p>
          <ul>
            <li>
              <a
                href="https://clinicaltrials.gov"
                target="_blank"
                rel="noopener noreferrer"
              >
                ClinicalTrials.gov
              </a>{" "}
              - US trials
            </li>
            <li>
              <a
                href="https://www.isrctn.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ISRCTN Registry
              </a>{" "}
              - International trials
            </li>
          </ul>

          <h3>Research Methodology</h3>
          <div className="highlight">
            <p>
              <strong>Gold Standard:</strong> Randomized, double-blind,
              placebo-controlled trials
            </p>
            <p>
              <strong>Supervision:</strong> All studies include trained
              therapists or guides
            </p>
            <p>
              <strong>Safety Monitoring:</strong> Comprehensive medical and
              psychological screening
            </p>
          </div>

          <h3>Key Research Institutions</h3>
          <ul>
            <li>
              Johns Hopkins Center for Psychedelic and Consciousness Research
            </li>
            <li>NYU Grossman School of Medicine</li>
            <li>Imperial College London</li>
            <li>UCSF (University of California, San Francisco)</li>
            <li>
              MAPS (Multidisciplinary Association for Psychedelic Studies)
            </li>
          </ul>

          <h3>Subscribe for Updates</h3>
          <p>
            Get notified when we publish new research summaries and analysis.
          </p>

          <div className="disclaimer">
            <h4>Disclaimer</h4>
            <p>
              This research hub is for educational purposes only. Results from
              clinical trials do not constitute medical advice. Always consult
              with healthcare professionals.
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div>
          <h3>Content Not Found</h3>
          <p>We're sorry, but the requested content is not available.</p>
        </div>
      );
  }
};

export default ModalContent;
