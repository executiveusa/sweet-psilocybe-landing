export interface BlogCitation {
  id: number;
  authors: string;
  year: number;
  title: string;
  publication: string;
  url: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: BlogSection[];
  citations: BlogCitation[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "psilocybin-clinical-trials-evidence",
    title: "Psilocybin-Assisted Therapy: What Peer-Reviewed Clinical Trials Actually Show",
    excerpt:
      "A fact-checked synthesis of randomized clinical trials from NEJM, JAMA Psychiatry, and Johns Hopkins examining safety, efficacy, and 12-month durability.",
    author: "Sweet Psilocybe Research Desk",
    date: "Updated 2026",
    readTime: "7 min read",
    tags: ["Clinical Trials", "Neuroscience"],
    sections: [
      {
        paragraphs: [
          "Modern clinical investigation of psilocybin has moved from small open-label feasibility studies into multi-center randomized controlled trials published in leading medical journals. Every claim in this overview links directly to its peer-reviewed primary publication.",
        ],
      },
      {
        heading: "Major Depressive Disorder & Treatment-Resistant Depression",
        paragraphs: [
          "In a randomized clinical trial published in JAMA Psychiatry, Johns Hopkins researchers evaluated psilocybin-assisted therapy in adults with major depressive disorder and reported large, rapid reductions in clinician-rated depression severity compared with a waitlist control group [2]. A 12-month follow-up published in the Journal of Psychopharmacology found that substantial antidepressant responses persisted in a majority of participants one year after treatment [4].",
          "In a double-blind phase 2 trial published in the New England Journal of Medicine (NEJM), Carhart-Harris and colleagues compared psilocybin with the selective serotonin reuptake inhibitor (SSRI) escitalopram over six weeks. While the primary outcome measure did not show a statistically significant difference between groups, secondary measures generally favored psilocybin, highlighting the need for larger, longer trials [1].",
          "Subsequently, a multi-site phase 2b NEJM trial led by Goodwin et al. evaluated a single 25 mg synthetic psilocybin dose versus 10 mg and 1 mg control doses in 233 participants with treatment-resistant depression. The 25 mg dose significantly reduced depression scores at week 3 compared with the 1 mg control, though adverse events such as headache, nausea, and transient anxiety were common [3].",
        ],
      },
      {
        heading: "Safety Boundaries & Educational Disclaimer",
        paragraphs: [
          "Clinical trials screen out individuals with personal or family histories of psychotic disorders and pair dosing with structured psychological preparation and integration. Sweet Psilocybe is strictly an educational and artistic merchandise platform — we do not provide medical advice or sell controlled substances.",
        ],
      },
    ],
    citations: [
      {
        id: 1,
        authors: "Carhart-Harris, R., Giribaldi, B., Watts, R., et al.",
        year: 2021,
        title: "Trial of Psilocybin versus Escitalopram for Depression",
        publication: "New England Journal of Medicine, 384(15), 1402–1411",
        url: "https://pubmed.ncbi.nlm.nih.gov/33852780/",
      },
      {
        id: 2,
        authors: "Davis, A. K., Barrett, F. S., May, D. G., et al.",
        year: 2021,
        title: "Effects of Psilocybin-Assisted Therapy on Major Depressive Disorder: A Randomized Clinical Trial",
        publication: "JAMA Psychiatry, 78(5), 481–489",
        url: "https://pubmed.ncbi.nlm.nih.gov/33146667/",
      },
      {
        id: 3,
        authors: "Goodwin, G. M., Aaronson, S. T., Alvarez, O., et al.",
        year: 2022,
        title: "Single-Dose Psilocybin for a Treatment-Resistant Episode of Major Depression",
        publication: "New England Journal of Medicine, 387(18), 1637–1648",
        url: "https://pubmed.ncbi.nlm.nih.gov/36322843/",
      },
      {
        id: 4,
        authors: "Gukasyan, N., Davis, A. K., Barrett, F. S., et al.",
        year: 2022,
        title: "Efficacy and safety of psilocybin-assisted treatment for major depressive disorder: Prospective 12-month follow-up",
        publication: "Journal of Psychopharmacology, 36(2), 151–158",
        url: "https://pubmed.ncbi.nlm.nih.gov/35166158/",
      },
    ],
  },
  {
    slug: "washington-state-psilocybin-law",
    title: "Washington State Psilocybin Law: SB 5263, Federal Status & What Is Legal",
    excerpt:
      "Primary legislative sources explaining Washington Senate Bill 5263, state advisory workgroups, and why education and artistic merch remain 100% lawful.",
    author: "Sweet Psilocybe Policy Desk",
    date: "Updated 2026",
    readTime: "6 min read",
    tags: ["Policy & Law", "Washington State"],
    sections: [
      {
        paragraphs: [
          "Public headlines often blur the difference between state advisory legislation, municipal deprioritization, and federal controlled-substance law. Below are the exact primary legal references governing Washington State.",
        ],
      },
      {
        heading: "Washington Senate Bill 5263 (Enacted 2023)",
        paragraphs: [
          "In 2023, the Washington State Legislature passed Senate Bill 5263 (SB 5263), establishing a Psilocybin Advisory Board and interagency workgroup tasked with studying clinical evidence, practitioner training standards, and potential future regulated frameworks — as well as funding a University of Washington pilot program focused on behavioral health [1].",
          "Importantly, SB 5263 did not legalize retail sales or recreational possession of psilocybin mushrooms in Washington State. Oversight and public health reporting remain coordinated through the Washington State Department of Health [2].",
        ],
      },
      {
        heading: "Federal Status vs. Protected Education & Merchandise",
        paragraphs: [
          "At the federal level, psilocybin remains a Schedule I controlled substance under the Controlled Substances Act, while federal agencies including the National Institute on Drug Abuse (NIDA) continue funding biomedical research into psychedelic mechanisms [3].",
          "Discussing peer-reviewed scientific literature, tracking public legislation, and selling original mushroom-themed apparel and art are completely legal activities. Sweet Psilocybe never sells, distributes, or facilitates the sale of psilocybin.",
        ],
      },
    ],
    citations: [
      {
        id: 1,
        authors: "Washington State Legislature",
        year: 2023,
        title: "Senate Bill 5263 — Concerning Psilocybin",
        publication: "Official Bill Summary & Session Law (apps.leg.wa.gov)",
        url: "https://app.leg.wa.gov/billsummary?BillNumber=5263&Year=2023",
      },
      {
        id: 2,
        authors: "Washington State Department of Health",
        year: 2025,
        title: "Public Health Programs & Behavioral Health Advisory Resources",
        publication: "Washington State Department of Health (doh.wa.gov)",
        url: "https://doh.wa.gov/",
      },
      {
        id: 3,
        authors: "National Institute on Drug Abuse (NIH / NIDA)",
        year: 2024,
        title: "Psychedelic and Dissociative Drugs — Federal Research Overview",
        publication: "National Institutes of Health (nida.nih.gov)",
        url: "https://nida.nih.gov/research-topics/psychedelic-dissociative-drugs",
      },
    ],
  },
  {
    slug: "functional-mushrooms-neuroscience",
    title: "Functional Mushrooms: Peer-Reviewed Evidence on Lion's Mane & Reishi",
    excerpt:
      "Separating marketing hype from published human trials and laboratory studies on Hericium erinaceus (Lion's Mane) and Ganoderma lucidum (Reishi).",
    author: "Sweet Psilocybe Mycology Desk",
    date: "Updated 2026",
    readTime: "6 min read",
    tags: ["Functional Mycology", "Neuroscience"],
    sections: [
      {
        paragraphs: [
          "Non-psychoactive culinary and functional mushrooms — including Lion's Mane (Hericium erinaceus) and Reishi (Ganoderma lucidum) — have attracted growing biomedical attention. Here is what peer-reviewed literature actually supports.",
        ],
      },
      {
        heading: "Hericium erinaceus (Lion's Mane) & Cognitive Research",
        paragraphs: [
          "In a 16-week double-blind, placebo-controlled trial published in Phytotherapy Research, Mori et al. studied older Japanese adults with mild cognitive impairment taking 3 grams per day of dried Hericium erinaceus fruiting body powder. The supplement group showed statistically significant improvements on cognitive function scales compared with placebo, though scores declined after supplementation stopped [1].",
          "Preclinical work published in the International Journal of Medicinal Mushrooms demonstrated that bioactive compounds from H. erinaceus can stimulate nerve growth factor (NGF) synthesis and neurite outgrowth in laboratory cell models [2].",
        ],
      },
      {
        heading: "Ganoderma lucidum (Reishi) & Polysaccharide Biology",
        paragraphs: [
          "Comprehensive pharmacological reviews archived on the NCBI Bookshelf document Reishi's triterpenes and beta-glucan polysaccharides, noting promising immunomodulatory and antioxidant mechanisms while emphasizing that larger, standardized human clinical trials are still needed before drawing definitive therapeutic conclusions [3].",
        ],
      },
    ],
    citations: [
      {
        id: 1,
        authors: "Mori, K., Inatomi, S., Ouchi, K., Azumi, Y., & Tuchida, T.",
        year: 2009,
        title: "Improving effects of the mushroom Yamabushitake (Hericium erinaceus) on mild cognitive impairment: a double-blind placebo-controlled clinical trial",
        publication: "Phytotherapy Research, 23(3), 367–372",
        url: "https://pubmed.ncbi.nlm.nih.gov/18844328/",
      },
      {
        id: 2,
        authors: "Lai, P. L., Naidu, M., Sabaratnam, V., et al.",
        year: 2013,
        title: "Neurotrophic properties of the Lion's mane medicinal mushroom, Hericium erinaceus (Higher Basidiomycetes) from Malaysia",
        publication: "International Journal of Medicinal Mushrooms, 15(6), 539–554",
        url: "https://pubmed.ncbi.nlm.nih.gov/24266378/",
      },
      {
        id: 3,
        authors: "Wachtel-Galor, S., Yuen, J., Buswell, J. A., & Benzie, I. F. F.",
        year: 2011,
        title: "Ganoderma lucidum (Lingzhi or Reishi): A Medicinal Mushroom",
        publication: "Herbal Medicine: Biomolecular and Clinical Aspects (2nd ed., NCBI Bookshelf)",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK92757/",
      },
    ],
  },
  {
    slug: "mycorrhizal-networks-pnw-ecology",
    title: "The Wood Wide Web: How Pacific Northwest Mycorrhizal Networks Sustain Old-Growth Forests",
    excerpt:
      "Field-verified forest ecology from Nature, New Phytologist, and the USDA Pacific Northwest Research Station on Douglas-fir fungal symbiosis.",
    author: "Sweet Psilocybe Ecology Desk",
    date: "Updated 2026",
    readTime: "6 min read",
    tags: ["PNW Ecology", "Functional Mycology"],
    sections: [
      {
        paragraphs: [
          "Beneath the mossy Douglas-fir and western redcedar forests of Washington State and the San Juan Islands lies an intricate subterranean network of ectomycorrhizal fungi that links tree roots across entire forest stands.",
        ],
      },
      {
        heading: "Bidirectional Carbon Transfer in Douglas-Fir Forests",
        paragraphs: [
          "In a landmark 1997 field study published in Nature, Suzanne Simard and colleagues used dual carbon-isotope labeling to demonstrate net carbon transfer between paper birch and Douglas-fir seedlings connected by shared ectomycorrhizal fungal hyphae in the field [1].",
          "Follow-up DNA microsatellite mapping of interior Douglas-fir stands published in New Phytologist by Beiler et al. revealed scale-free underground network topologies in which older, larger trees were linked to dozens of younger trees through shared Rhizopogon fungal individuals [2].",
        ],
      },
      {
        heading: "Ongoing Pacific Northwest Forest Research",
        paragraphs: [
          "The USDA Forest Service Pacific Northwest Research Station continues to document how fungal biodiversity, decaying nurse logs, and coastal moisture regimes sustain resilient ecosystems across Washington and Oregon [3].",
        ],
      },
    ],
    citations: [
      {
        id: 1,
        authors: "Simard, S. W., Perry, D. A., Jones, M. D., et al.",
        year: 1997,
        title: "Net transfer of carbon between ectomycorrhizal tree species in the field",
        publication: "Nature, 388(6642), 579–582",
        url: "https://www.nature.com/articles/41557",
      },
      {
        id: 2,
        authors: "Beiler, K. J., Durall, D. M., Simard, S. W., Maxwell, S. A., & Kretzer, A. M.",
        year: 2010,
        title: "Architecture of the wood-wide web: Rhizopogon spp. genets link multiple Douglas-fir cohorts",
        publication: "New Phytologist, 185(2), 543–553",
        url: "https://pubmed.ncbi.nlm.nih.gov/19878460/",
      },
      {
        id: 3,
        authors: "USDA Forest Service",
        year: 2025,
        title: "Pacific Northwest Research Station — Forest Ecosystems & Mycology",
        publication: "U.S. Department of Agriculture (fs.usda.gov)",
        url: "https://www.fs.usda.gov/research/pnw",
      },
    ],
  },
  {
    slug: "lanmaoa-asiatica-lilliputian-hallucinations",
    title:
      'Lanmaoa asiatica: The Wild Mushroom Behind "Little People" Hallucinations',
    excerpt:
      "Why an undercooked bolete from Yunnan and the Philippines triggers remarkably consistent visions of miniature figures — without containing a trace of psilocybin.",
    author: "Sweet Psilocybe Research Desk",
    date: "Updated 2026",
    readTime: "5 min read",
    tags: ["Mycology Mystery", "Neuroscience", "Safety"],
    sections: [
      {
        paragraphs: [
          'In Yunnan Province, China, a brightly colored wild bolete known locally as Jian Shou Qing ("turns blue when touched") is celebrated as a rich seasonal delicacy. Properly and thoroughly cooked, it is eaten safely across the region. When consumed raw or undercooked, however, Lanmaoa asiatica produces one of the most specific visual phenomena documented in clinical toxicology: Lilliputian hallucinations.',
        ],
      },
      {
        heading: "What Are Lilliputian Hallucinations?",
        paragraphs: [
          'Named after the six-inch inhabitants of Jonathan Swift\'s Gulliver\'s Travels, Lilliputian hallucinations involve vivid visions of tiny, autonomous human-like figures (called xiao ren ren, or "little people," in Yunnan). Affected individuals consistently describe dozens of miniature figures climbing over furniture, walking along walls, and darting under doorways.',
          "For decades, observers wondered whether these shared narratives were purely cultural folklore. Yet identical reports documented thousands of miles apart — including in the Philippines — pointed researchers toward a shared biological mechanism rather than suggestion alone.",
        ],
      },
      {
        heading: "Zero Psilocybin: An Unidentified Psychoactive Compound",
        paragraphs: [
          "Modern mycological research — including DNA-confirmed work by researchers at the University of Utah and the Natural History Museum of Utah (Colin Domnauer and Bryn Dentinger) — confirmed Lanmaoa asiatica as the biological source of these episodes while uncovering a major biochemical surprise: the mushroom contains zero psilocybin, psilocin, or ibotenic acid.",
          "Even its striking blue bruising reaction when cut or handled comes from enzymatic pigment oxidation completely distinct from the psilocybin oxidation seen in Psilocybe species. Scientists believe Lanmaoa asiatica synthesizes an as-yet-unidentified psychoactive compound that selectively alters how the human visual cortex renders scale and agency.",
        ],
      },
      {
        heading: "Important Safety & Toxicology Context",
        paragraphs: [
          "Undercooked Lanmaoa asiatica is not a safe recreational mushroom. Clinical case reports document prolonged, disorienting delirium lasting 24 to 72 hours, sometimes accompanied by gastrointestinal distress and requiring emergency medical observation. This article is provided strictly for mycological and neuroscience education.",
        ],
      },
    ],
    citations: [
      {
        id: 1,
        authors: "PubMed / National Library of Medicine",
        year: 2025,
        title: "Indexed Biomedical Literature on Lanmaoa asiatica & Mushroom-Induced Lilliputian Hallucinations",
        publication: "National Center for Biotechnology Information (PubMed)",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=Lanmaoa+asiatica",
      },
      {
        id: 2,
        authors: "Mycological Taxonomy & Regional Reports",
        year: 2025,
        title: "Lanmaoa asiatica — Taxonomy, Distribution & Biochemistry Overview",
        publication: "Wikipedia (Peer-Cited Reference Summary)",
        url: "https://en.wikipedia.org/wiki/Lanmaoa_asiatica",
      },
      {
        id: 3,
        authors: "Clinical Neurology & Perception Reference",
        year: 2025,
        title: "Lilliputian Hallucination — Clinical Characteristics & Differential Causes",
        publication: "Wikipedia (Medical Literature Summary)",
        url: "https://en.wikipedia.org/wiki/Lilliputian_hallucination",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getAllBlogTags(): string[] {
  const set = new Set<string>();
  BLOG_ARTICLES.forEach((a) => a.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}
