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

const Card = styled.div`
  background: linear-gradient(135deg, rgba(246, 175, 207, 0.05) 0%, rgba(169, 192, 176, 0.05) 100%);
  border: 1px solid rgba(246, 175, 207, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ResourceLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const ResourceCard = styled.div`
  background: rgba(11, 11, 11, 0.5);
  border: 1px solid rgba(246, 175, 207, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(246, 175, 207, 0.2);
  }
`;

const ResourceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.75rem;
`;

const ResourceDesc = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--light-gray);
  margin-bottom: 0.75rem;
`;

export default function ResourcesPage() {
  return (
    <Section id="resources">
      <Container>
        <Title>Resources</Title>
        
        <Card>
          <Subtitle>🔬 Research Hub</Subtitle>
          <Text>
            Access curated, peer-reviewed research on psilocybin and psychedelic science. Our research hub aggregates 
            findings from leading institutions and clinical trials worldwide.
          </Text>

          <ResourceGrid>
            <ResourceCard>
              <ResourceTitle>Clinical Studies</ResourceTitle>
              <ResourceDesc>
                Latest FDA-approved clinical trials investigating psilocybin for treatment-resistant depression, PTSD, 
                anxiety, and addiction.
              </ResourceDesc>
              <ResourceLink href="https://clinicaltrials.gov/search?term=psilocybin" target="_blank" rel="noopener noreferrer">
                View Clinical Trials →
              </ResourceLink>
            </ResourceCard>

            <ResourceCard>
              <ResourceTitle>Research Institutions</ResourceTitle>
              <ResourceDesc>
                Johns Hopkins, Imperial College London, MAPS, Usona Institute, and other leading centers advancing 
                psychedelic research.
              </ResourceDesc>
              <ResourceLink href="https://hopkinspsychedelic.org/" target="_blank" rel="noopener noreferrer">
                Johns Hopkins Center →
              </ResourceLink>
            </ResourceCard>

            <ResourceCard>
              <ResourceTitle>Academic Papers</ResourceTitle>
              <ResourceDesc>
                Peer-reviewed publications on pharmacology, neuroscience, therapeutic applications, and safety profiles 
                of psilocybin.
              </ResourceDesc>
              <ResourceLink href="https://scholar.google.com/scholar?q=psilocybin+research" target="_blank" rel="noopener noreferrer">
                Google Scholar →
              </ResourceLink>
            </ResourceCard>

            <ResourceCard>
              <ResourceTitle>Mechanism of Action</ResourceTitle>
              <ResourceDesc>
                Understanding how psilocybin affects serotonin receptors, default mode network, and neuroplasticity 
                in the brain.
              </ResourceDesc>
              <ResourceLink href="https://www.nature.com/subjects/psilocybin" target="_blank" rel="noopener noreferrer">
                Nature Research →
              </ResourceLink>
            </ResourceCard>
          </ResourceGrid>
        </Card>

        <Card>
          <Subtitle>🛡️ Safety Information</Subtitle>
          <Text>
            Natural alternatives are our priority. If you choose to use psilocybin, understand the risks, contraindications, 
            and best practices for safe use.
          </Text>

          <Text><strong>Who Should NOT Use Psilocybin:</strong></Text>
          <ul style={{ color: 'var(--light-gray)', fontSize: '1.125rem', lineHeight: '1.8', marginLeft: '2rem', marginBottom: '1.5rem' }}>
            <li>Individuals with schizophrenia or family history of psychosis</li>
            <li>Those with severe anxiety disorders or panic disorder</li>
            <li>People taking MAOIs, SSRIs, or other serotonergic medications</li>
            <li>Pregnant or breastfeeding individuals</li>
            <li>Anyone with severe cardiovascular conditions</li>
            <li>Minors under 18 years of age</li>
          </ul>

          <Text><strong>Natural Alternatives Principles:</strong></Text>
          <ResourceGrid>
            <ResourceCard>
              <ResourceTitle>Set & Setting</ResourceTitle>
              <ResourceDesc>
                Mental state (set) and physical environment (setting) profoundly influence the experience. Choose a 
                safe, comfortable location with trusted people.
              </ResourceDesc>
            </ResourceCard>

            <ResourceCard>
              <ResourceTitle>Start Low, Go Slow</ResourceTitle>
              <ResourceDesc>
                Begin with a threshold dose (0.5-1g dried mushrooms) to assess sensitivity. Wait at least 1 week between 
                experiences to avoid tolerance.
              </ResourceDesc>
            </ResourceCard>

            <ResourceCard>
              <ResourceTitle>Trip Sitter</ResourceTitle>
              <ResourceDesc>
                Have a sober, trusted person present who can provide reassurance and assistance if needed. They should 
                know basic natural alternatives practices.
              </ResourceDesc>
            </ResourceCard>

            <ResourceCard>
              <ResourceTitle>Test Your Substances</ResourceTitle>
              <ResourceDesc>
                Use reagent test kits to verify the identity of mushrooms. Misidentification can be dangerous or fatal. 
                When in doubt, don't consume.
              </ResourceDesc>
            </ResourceCard>
          </ResourceGrid>

          <Text><strong>Emergency Resources:</strong></Text>
          <Text>
            • <strong>Fireside Project:</strong> Psychedelic peer support - Call/Text 62-FIRESIDE (623-473-7433)<br/>
            • <strong>SAMHSA National Helpline:</strong> 1-800-662-4357 (24/7, free, confidential)<br/>
            • <strong>Poison Control:</strong> 1-800-222-1222<br/>
            • <strong>911:</strong> For life-threatening emergencies
          </Text>

          <Text style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '1.5rem' }}>
            Remember: There is no 100% safe use of psilocybin outside of clinical supervision. These guidelines reduce 
            risk but do not eliminate it. Legal status varies by location.
          </Text>
        </Card>

        <Card>
          <Subtitle>❓ Frequently Asked Questions</Subtitle>
          
          <Text><strong>What is psilocybin?</strong></Text>
          <Text>
            Psilocybin is a naturally occurring psychedelic compound found in over 200 species of mushrooms. When ingested, 
            it converts to psilocin, which primarily affects serotonin 5-HT2A receptors in the brain, leading to altered 
            perception, mood, and cognition.
          </Text>

          <Text><strong>Is psilocybin legal?</strong></Text>
          <Text>
            Legal status varies widely. In the United States, psilocybin is federally classified as Schedule I, but some 
            cities (Denver, Oakland, Santa Cruz, Ann Arbor, Washington DC) and states (Oregon, Colorado) have decriminalized 
            or legalized it in specific contexts. Canada allows exemptions for medical use. Many countries maintain 
            prohibition, while others (Netherlands, Jamaica, Brazil) have more permissive policies.
          </Text>

          <Text><strong>Can psilocybin treat depression?</strong></Text>
          <Text>
            Clinical trials show promising results for treatment-resistant depression. Johns Hopkins and Imperial College 
            London studies demonstrate significant, rapid antidepressant effects lasting weeks to months after 1-2 
            psilocybin-assisted therapy sessions. However, it's not FDA-approved and should only be used under medical 
            supervision in approved clinical settings.
          </Text>

          <Text><strong>How long does a psilocybin experience last?</strong></Text>
          <Text>
            Effects typically begin 20-40 minutes after ingestion, peak at 2-3 hours, and subside after 4-6 hours total. 
            Factors like dose, stomach contents, and individual metabolism affect duration.
          </Text>

          <Text><strong>Is psilocybin addictive?</strong></Text>
          <Text>
            No. Psilocybin has very low abuse potential. It does not produce physical dependence, and tolerance develops 
            rapidly (requiring days to reset). Most users don't desire frequent use due to the intensity of the experience.
          </Text>

          <Text><strong>Can I microdose psilocybin?</strong></Text>
          <Text>
            Microdosing (taking sub-perceptual doses, typically 0.1-0.3g every few days) is popular but not well-studied. 
            Anecdotal reports suggest benefits for mood, creativity, and focus, but controlled research is limited. Legal 
            status remains unchanged regardless of dose.
          </Text>

          <Text><strong>What's the difference between psilocybin and LSD?</strong></Text>
          <Text>
            Both are serotonergic psychedelics but differ in structure, duration, and subjective effects. Psilocybin is 
            natural (from mushrooms), lasts 4-6 hours, and often described as "earthy" or "introspective." LSD is synthetic, 
            lasts 8-12 hours, and often more visual/energetic. Both are Schedule I in most jurisdictions.
          </Text>

          <Text><strong>Where can I find more information?</strong></Text>
          <Text>
            • <ResourceLink href="https://erowid.org/plants/mushrooms/" target="_blank" rel="noopener noreferrer">Erowid</ResourceLink> - Experience reports and research<br/>
            • <ResourceLink href="https://www.maps.org/" target="_blank" rel="noopener noreferrer">MAPS</ResourceLink> - Multidisciplinary Association for Psychedelic Studies<br/>
            • <ResourceLink href="https://psychedelicscience.org/" target="_blank" rel="noopener noreferrer">Heffter Research Institute</ResourceLink> - Clinical research<br/>
            • <ResourceLink href="https://www.shroomery.org/" target="_blank" rel="noopener noreferrer">Shroomery</ResourceLink> - Community forum and identification<br/>
            • <ResourceLink href="#email-capture">Our Newsletter</ResourceLink> - Subscribe for research updates
          </Text>
        </Card>

        <Card style={{ background: 'rgba(246, 175, 207, 0.1)', borderColor: 'var(--primary)' }}>
          <Text style={{ color: 'var(--white)', textAlign: 'center', fontSize: '1.125rem' }}>
            💬 <strong>Have questions we didn't answer?</strong><br/>
            Contact us at <ResourceLink href="mailto:info@sweetpsilocybe.com">info@sweetpsilocybe.com</ResourceLink>
          </Text>
        </Card>
      </Container>
    </Section>
  );
}
