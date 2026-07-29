'use client';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(135deg, #0B0B0B 0%, #1a1a2e 100%);
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--white);
  margin: 3rem 0 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--light-gray);
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background: rgba(11, 11, 11, 0.5);
  border: 1px solid rgba(246, 175, 207, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const UpdateDate = styled.div`
  font-size: 0.9rem;
  color: var(--light-gray);
  font-style: italic;
  margin-bottom: 1.5rem;
`;

export default function LegalPage() {
  return (
    <Section id="legal">
      <Container>
        <Title>Legal Information</Title>
        <UpdateDate>Last Updated: November 8, 2025</UpdateDate>
        
        <Card>
          <Subtitle>Terms of Use</Subtitle>
          <Text>
            By accessing and using Sweet Psilocybe ("the Site"), you agree to comply with and be bound by these Terms of Use. 
            If you do not agree with these terms, please do not use this site.
          </Text>
          
          <Text><strong>1. Educational Purpose Only</strong></Text>
          <Text>
            Sweet Psilocybe is an educational platform providing information about psilocybin research and natural alternatives. 
            We do not provide medical advice, diagnose conditions, prescribe treatments, or encourage illegal activities. 
            All content is for informational purposes only.
          </Text>

          <Text><strong>2. Age Restriction</strong></Text>
          <Text>
            This site is restricted to individuals 18 years of age or older. By using this site, you confirm that you meet 
            this age requirement and are legally permitted to view this content in your jurisdiction.
          </Text>

          <Text><strong>3. No Sale or Distribution</strong></Text>
          <Text>
            Sweet Psilocybe does not sell, distribute, cultivate, or facilitate the acquisition of psilocybin mushrooms or 
            any controlled substances. We do not provide instructions for cultivation or extraction. Any merchandise sold 
            through our platform is legal, non-psychoactive, and for educational or personal use only.
          </Text>

          <Text><strong>4. Intellectual Property</strong></Text>
          <Text>
            All content, including text, graphics, logos, and images, is the property of Sweet Psilocybe or its content 
            providers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works 
            without explicit written permission.
          </Text>

          <Text><strong>5. User Conduct</strong></Text>
          <Text>
            Users agree not to use the Site to engage in illegal activities, harass others, distribute malware, or violate 
            any applicable laws. We reserve the right to terminate access for violations of these terms.
          </Text>

          <Text><strong>6. Third-Party Links</strong></Text>
          <Text>
            Our site may contain links to third-party websites for reference purposes. We are not responsible for the 
            content, privacy practices, or terms of these external sites.
          </Text>
        </Card>

        <Card>
          <Subtitle>Privacy Policy</Subtitle>
          <Text>
            Sweet Psilocybe respects your privacy and is committed to protecting your personal information. This Privacy 
            Policy explains how we collect, use, and safeguard your data.
          </Text>

          <Text><strong>Information We Collect</strong></Text>
          <Text>
            • <strong>Email Addresses:</strong> When you subscribe to our newsletter or contact us, we collect your email address.<br/>
            • <strong>Age Verification:</strong> We use cookies to verify that users are 18+ (no personal data stored).<br/>
            • <strong>Analytics Data:</strong> We collect anonymous usage data (page views, device types, geographic location) 
            through Vercel Analytics to improve our site.<br/>
            • <strong>Cookies:</strong> We use cookies for age verification, analytics, and site functionality.
          </Text>

          <Text><strong>How We Use Your Information</strong></Text>
          <Text>
            • Send educational content and research updates (email subscribers only)<br/>
            • Improve site performance and user experience<br/>
            • Respond to inquiries and support requests<br/>
            • Comply with legal obligations
          </Text>

          <Text><strong>Data Protection</strong></Text>
          <Text>
            We implement industry-standard security measures including HTTPS encryption, HTTP-only cookies, Content Security 
            Policy headers, and secure database storage. Your email addresses are stored in encrypted databases and never 
            sold to third parties.
          </Text>

          <Text><strong>Your Rights</strong></Text>
          <Text>
            You have the right to:<br/>
            • Access your personal data<br/>
            • Request deletion of your data<br/>
            • Unsubscribe from emails at any time<br/>
            • Opt out of analytics tracking
          </Text>

          <Text><strong>Data Retention</strong></Text>
          <Text>
            Email addresses are retained until you unsubscribe. Age verification cookies expire after 30 days. 
            Analytics data is anonymized and retained for performance analysis.
          </Text>

          <Text><strong>Contact for Privacy Concerns</strong></Text>
          <Text>
            For privacy-related questions or to exercise your data rights, email us at{' '}
            <a href="mailto:privacy@sweetpsilocybe.com" style={{ color: 'var(--primary)' }}>
              privacy@sweetpsilocybe.com
            </a>
          </Text>
        </Card>

        <Card>
          <Subtitle>Disclaimers</Subtitle>
          
          <Text><strong>⚠️ Medical Disclaimer</strong></Text>
          <Text>
            The information on this site is not medical advice and should not be used to diagnose, treat, cure, or prevent 
            any disease or condition. Psilocybin is a Schedule I controlled substance in many jurisdictions. Always consult 
            qualified healthcare professionals before making any health decisions. Do not stop prescribed medications without 
            medical supervision.
          </Text>

          <Text><strong>⚠️ Legal Disclaimer</strong></Text>
          <Text>
            Laws regarding psilocybin vary widely by country, state, and municipality. Some jurisdictions have decriminalized 
            possession, while others enforce strict penalties. It is your responsibility to understand and comply with all 
            applicable laws in your area. Sweet Psilocybe does not provide legal advice and is not liable for any legal 
            consequences of your actions.
          </Text>

          <Text><strong>⚠️ Natural Alternatives Notice</strong></Text>
          <Text>
            If you choose to use psilocybin mushrooms, understand the risks:<br/>
            • Set and setting matter greatly<br/>
            • Start with low doses (natural alternatives principle)<br/>
            • Never mix with other substances without research<br/>
            • Have a trusted sober person present<br/>
            • Avoid use if you have a personal or family history of psychosis<br/>
            • Do not operate vehicles or machinery while under the influence
          </Text>

          <Text><strong>⚠️ Research Disclaimer</strong></Text>
          <Text>
            Psilocybin research is rapidly evolving. While we strive to provide current, accurate information based on 
            peer-reviewed studies, scientific understanding changes over time. Always verify information with primary sources 
            and consult recent publications.
          </Text>

          <Text><strong>⚠️ No Liability</strong></Text>
          <Text>
            Sweet Psilocybe, its owners, operators, and contributors are not liable for any damages, losses, or consequences 
            arising from use of this site or actions taken based on information provided. Use of this site is at your own risk.
          </Text>

          <Text><strong>⚠️ Crisis Resources</strong></Text>
          <Text>
            If you are experiencing a mental health crisis:<br/>
            • <strong>SAMHSA National Helpline:</strong> 1-800-662-4357 (24/7, free, confidential)<br/>
            • <strong>Crisis Text Line:</strong> Text HOME to 741741<br/>
            • <strong>Suicide Prevention Lifeline:</strong> 988 or 1-800-273-8255<br/>
            • <strong>Fireside Project Psychedelic Peer Support:</strong> Call or text 62-FIRESIDE (623-473-7433)
          </Text>
        </Card>

        <Card style={{ background: 'rgba(246, 175, 207, 0.1)', borderColor: 'var(--primary)' }}>
          <Text style={{ color: 'var(--white)', fontWeight: 600 }}>
            By continuing to use this site, you acknowledge that you have read, understood, and agree to these Terms of Use, 
            Privacy Policy, and Disclaimers. These terms may be updated periodically, and continued use constitutes acceptance 
            of any changes.
          </Text>
        </Card>
      </Container>
    </Section>
  );
}
