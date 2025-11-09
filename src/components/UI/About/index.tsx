'use client';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: var(--Background);
  
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

const ContactLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, rgba(246, 175, 207, 0.05) 0%, rgba(169, 192, 176, 0.05) 100%);
  border: 1px solid rgba(246, 175, 207, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

export default function AboutPage() {
  return (
    <Section id="about">
      <Container>
        <Title>About Sweet Psilocybe</Title>
        
        <Card>
          <Subtitle>Our Mission</Subtitle>
          <Text>
            Sweet Psilocybe is dedicated to advancing public understanding of psilocybin mushrooms through evidence-based research and education. 
            We believe that informed communities make better decisions about mental health, natural alternatives, and therapeutic approaches.
          </Text>
          <Text>
            Our mission is to bridge the gap between cutting-edge scientific research and public knowledge, making complex findings accessible 
            to everyone interested in the therapeutic potential of psilocybin. We collaborate with leading researchers, institutions, and 
            advocates to ensure our content reflects the latest developments in psychedelic science.
          </Text>
          <Text>
            <strong>We are committed to:</strong>
          </Text>
          <ul style={{ color: 'var(--light-gray)', fontSize: '1.125rem', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li>Providing accurate, science-based information</li>
            <li>Supporting natural alternatives initiatives</li>
            <li>Promoting responsible research and education</li>
            <li>Respecting legal boundaries and regulations</li>
            <li>Fostering community dialogue and understanding</li>
          </ul>
        </Card>

        <Card>
          <Subtitle>Research Partners</Subtitle>
          <Text>
            We work alongside leading institutions and organizations pioneering psilocybin research:
          </Text>
          <Text>
            <strong>Academic Institutions:</strong> Our content draws from peer-reviewed studies published by Johns Hopkins Center for Psychedelic 
            and Consciousness Research, Imperial College London Centre for Psychedelic Research, MAPS (Multidisciplinary Association for 
            Psychedelic Studies), and other respected research centers worldwide.
          </Text>
          <Text>
            <strong>Clinical Researchers:</strong> We stay current with FDA-approved clinical trials, therapeutic protocols, and safety guidelines 
            established by licensed researchers and medical professionals.
          </Text>
          <Text>
            <strong>Natural Alternatives Organizations:</strong> We partner with organizations like DanceSafe, Erowid, and the Zendo Project to 
            provide accurate safety information and support resources.
          </Text>
          <Text>
            <em>Note: Sweet Psilocybe is an educational platform. We are not affiliated with any pharmaceutical companies or organizations 
            that cultivate, distribute, or sell psilocybin mushrooms.</em>
          </Text>
        </Card>

        <Card>
          <Subtitle>Contact Us</Subtitle>
          <Text>
            We welcome questions, feedback, and collaboration inquiries. Whether you're a researcher, educator, journalist, or simply 
            curious about our mission, we'd love to hear from you.
          </Text>
          <Text>
            <strong>General Inquiries:</strong> <ContactLink href="mailto:info@sweetpsilocybe.com">info@sweetpsilocybe.com</ContactLink>
          </Text>
          <Text>
            <strong>Research Collaboration:</strong> <ContactLink href="mailto:research@sweetpsilocybe.com">research@sweetpsilocybe.com</ContactLink>
          </Text>
          <Text>
            <strong>Media Requests:</strong> <ContactLink href="mailto:press@sweetpsilocybe.com">press@sweetpsilocybe.com</ContactLink>
          </Text>
          <Text>
            <strong>Join Our Newsletter:</strong> <ContactLink href="#email-capture">Sign up below</ContactLink> to receive updates about 
            new research, educational content, and community initiatives.
          </Text>
          <Text style={{ fontSize: '0.9rem', marginTop: '2rem', fontStyle: 'italic' }}>
            We aim to respond to all inquiries within 48 hours. For immediate support or crisis resources, please visit our{' '}
            <ContactLink href="#resources">Resources section</ContactLink> or contact SAMHSA's National Helpline at 1-800-662-4357.
          </Text>
        </Card>
      </Container>
    </Section>
  );
}
