import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

// ── Client ────────────────────────────────────────────────────────────────────

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function block(key: string, text: string, marks: string[] = []) {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal',
    markDefs: [] as unknown[],
    children: [{ _type: 'span', _key: `${key}s`, text, marks }],
  }
}

/** Generate a simple lexicographic orderRank for position n (1-based) out of total. */
function orderRank(n: number): string {
  return String(n).padStart(6, '0')
}

async function upsert(doc: Record<string, unknown>) {
  const id = doc._id as string
  await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
  console.log(`  ✓  ${doc._type}  ${id}`)
}

// ── Seed functions ─────────────────────────────────────────────────────────────

async function seedSiteSettings() {
  console.log('\n📌 siteSettings')
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    navLinks: [
      { _key: 'nav-1', label: 'Vision', anchor: '#vision' },
      { _key: 'nav-2', label: 'Domains', anchor: '#domains' },
      { _key: 'nav-3', label: 'Ecosystem', anchor: '#ecosystem' },
      { _key: 'nav-4', label: 'Advisory', anchor: '#advisory' },
      { _key: 'nav-5', label: 'Journey', anchor: '#journey' },
      { _key: 'nav-6', label: 'Summit', anchor: '#summit' },
    ],
    primaryCtaLabel: 'Bring to my school',
    primaryCtaLink: '#school-form',
    footerTagline:
      "A capability-building movement for students, educators, and schools — built with the world's leading organisations. An initiative of Viksit Bharat Foundation.",
    footerExploreLinks: [
      { _key: 'fe-1', label: 'Who we build', link: '#ecosystem' },
      { _key: 'fe-2', label: 'Domains', link: '#domains' },
      { _key: 'fe-3', label: 'WeThink Summit', link: '#summit' },
      { _key: 'fe-4', label: 'The journey', link: '#journey' },
    ],
    footerConnectLinks: [
      { _key: 'fc-1', label: 'School enquiry', link: '#school-form' },
      { _key: 'fc-2', label: 'Partner with us', link: '#partner-form' },
      { _key: 'fc-3', label: 'Advisory board', link: '#advisory' },
    ],
    copyrightText: '© 2026 WeThink Bharat. All rights reserved.',
    formNotConnectedToast:
      "Thank you — your enquiry has been received. We'll be in touch soon.",
    seoTitle: "WeThink Bharat — Experiential Learning for India's Students",
    seoDescription:
      'WeThink Bharat brings real industry into schools — through domain simulators, live projects, and a permanent digital footprint for every student.',
  })
}

async function seedHero() {
  console.log('\n🦸 hero')
  await upsert({
    _id: 'hero',
    _type: 'hero',
    seasonBanner: 'Season 1 · school nominations open',
    headline: [
      {
        _type: 'block',
        _key: 'h1',
        style: 'normal',
        markDefs: [{ _key: 'gold', _type: 'gold' }],
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: "India's students deserve to ",
            marks: [],
          },
          {
            _type: 'span',
            _key: 's2',
            text: 'discover',
            marks: ['gold'],
          },
          {
            _type: 'span',
            _key: 's3',
            text: ' before they choose',
            marks: [],
          },
        ],
      },
    ],
    subcopy:
      'WeThink Bharat brings real industry into schools — through domain simulators, live projects, and a permanent digital footprint that belongs to every student forever.',
    primaryCtaLabel: 'Explore the domains',
    primaryCtaLink: '#domains',
    secondaryCtaLabel: 'Bring to my school',
    secondaryCtaLink: '#school-form',
    domainsStrip: '3 industry domains live now — Entrepreneurship, Media & Design',
    scrollCueText: 'Scroll to explore',
  })
}

async function seedVisionSection() {
  console.log('\n👁️  visionSection')
  await upsert({
    _id: 'visionSection',
    _type: 'visionSection',
    kicker: 'Our vision',
    heading:
      'A Bharat where every student discovers their capability before they ever have to choose a path.',
    directorQuote:
      'Why do we wait until after graduation to give students real experience? By then, the choice is already made.',
    purpose: {
      label: 'Purpose',
      text: 'Expose every student to the real world of work — early, and for real.',
    },
    vision: {
      label: 'Vision',
      text: 'A generation that enters adulthood already knowing what it is capable of.',
    },
    mission: {
      label: 'Mission',
      text: 'Real briefs, real mentors, and permanent proof — inside every school.',
    },
  })
}

async function seedBeliefsIntro() {
  console.log('\n💡 beliefsIntro')
  await upsert({
    _id: 'beliefsIntro',
    _type: 'beliefsIntro',
    kicker: 'What we believe',
    heading: 'Six convictions that drive everything we build',
    intro:
      'Not values on a wall — design principles behind every simulator, every project brief, every partner conversation.',
  })
}

async function seedBeliefs() {
  console.log('\n🧠 beliefs')
  const beliefs = [
    {
      number: 1,
      title: 'Experience is the only real teacher',
      body: 'Reading about entrepreneurship and running a startup simulation are not the same thing. We build experiences — not content.',
    },
    {
      number: 2,
      title: 'Every student has undiscovered capability',
      body: "Potential is universally present. The system just hasn't created the conditions to find it yet.",
    },
    {
      number: 3,
      title: 'Industry must come to the student',
      body: 'We cannot wait for students to graduate before industry engages them. The relationship must begin at school — and it must be real.',
    },
    {
      number: 4,
      title: 'Failure in a safe space is a gift',
      body: 'A student who has failed at a simulated pitch is infinitely better prepared than one who has never tried.',
    },
    {
      number: 5,
      title: "A digital footprint is a student's first asset",
      body: 'Before a degree, before a job — a student deserves something permanently, globally, verifiably theirs.',
    },
    {
      number: 6,
      title: 'Scale is the only measure that matters',
      body: 'A program that changes 100 students is a project. A movement that changes a generation is what WeThink Bharat is built to be.',
    },
  ]

  for (const b of beliefs) {
    await upsert({
      _id: `belief-${b.number}`,
      _type: 'belief',
      orderRank: orderRank(b.number),
      number: b.number,
      title: b.title,
      body: b.body,
    })
  }
}

async function seedPathwaysIntro() {
  console.log('\n🛤️  pathwaysIntro')
  await upsert({
    _id: 'pathwaysIntro',
    _type: 'pathwaysIntro',
    kicker: 'Capability across the whole ecosystem',
    heading:
      "We don't build students in isolation. We build the educators who guide them and the schools that hold it all together.",
  })
}

async function seedPathways() {
  console.log('\n🚀 pathways')
  const pathways = [
    {
      _id: 'pathway-1',
      audienceLabel: 'For Students',
      title: 'Discover your capability before you choose your path.',
      description:
        'Real domain simulations, live industry projects, mentorship, and a permanent digital footprint — all before Class 12.',
    },
    {
      _id: 'pathway-2',
      audienceLabel: 'For Educators',
      title: 'Be the guide students remember for life.',
      description:
        'Facilitation training, curriculum integration support, and a community of educators redefining what school can be.',
    },
    {
      _id: 'pathway-3',
      audienceLabel: 'For Schools',
      title: 'Be the school that gives students the future.',
      description:
        'End-to-end programme delivery, industry partnerships, and national recognition at the WeThink Summit.',
    },
  ]

  for (let i = 0; i < pathways.length; i++) {
    const p = pathways[i]
    await upsert({
      _id: p._id,
      _type: 'pathway',
      orderRank: orderRank(i + 1),
      audienceLabel: p.audienceLabel,
      title: p.title,
      description: p.description,
    })
  }
}

async function seedGapSection() {
  console.log('\n📊 gapSection')
  await upsert({
    _id: 'gapSection',
    _type: 'gapSection',
    kicker: 'The gap',
    heading: 'Educated unemployment begins with uninformed choices.',
    stats: [
      {
        _key: 'stat-1',
        value: '65',
        suffix: '%',
        label: 'Graduates Unemployable',
        description:
          'of Indian graduates are considered unprepared for work by employers — not for lack of intelligence, but lack of experience.',
      },
      {
        _key: 'stat-2',
        value: '93',
        suffix: '%',
        label: 'No Career Exposure',
        description:
          'of school students in India have never had any real interaction with a working professional in their area of interest.',
      },
      {
        _key: 'stat-3',
        value: '1.5',
        suffix: 'Cr+',
        label: 'Students Enter Workforce Yearly',
        description:
          'students enter the Indian workforce every year having made their most important life decision based on almost no real-world exposure.',
      },
    ],
  })
}

async function seedDomainsIntro() {
  console.log('\n🌐 domainsIntro')
  await upsert({
    _id: 'domainsIntro',
    _type: 'domainsIntro',
    kicker: 'The domains',
    heading: 'Real industries. Real simulators. Real mentors.',
    subtext:
      'Three live domains — each with an industry partner, a simulator, and a structured journey from exposure to national showcase.',
  })
}

async function seedDomains() {
  console.log('\n🏭 domains')

  const domains = [
    {
      _id: 'domain-1',
      number: 1,
      name: 'Entrepreneurship',
      partnerName: 'NASSCOM 10,000 Startups',
      simulatorName: 'Startup Studio',
      status: 'live',
      levels: [
        {
          _key: 'lvl-1-1',
          levelLabel: 'Level 1',
          title: 'The Brief',
          description:
            'Students receive a real startup challenge brief from NASSCOM mentors — a problem statement grounded in current market conditions.',
        },
        {
          _key: 'lvl-1-2',
          levelLabel: 'Level 2',
          title: 'The Build',
          description:
            'Teams develop their solution: market research, business model, prototype, and go-to-market strategy — with weekly mentor check-ins.',
        },
        {
          _key: 'lvl-1-3',
          levelLabel: 'Level 3',
          title: 'The Pitch',
          description:
            'Students pitch their startup to a panel of investors and founders at school level — feedback that shapes real thinking.',
        },
        {
          _key: 'lvl-1-4',
          levelLabel: 'Level 4',
          title: 'The Summit',
          description:
            'The strongest teams from across India compete at the WeThink Summit — in front of a national jury from the startup ecosystem.',
        },
      ],
      outcomes: [
        'A complete startup pitch deck',
        'A validated business model canvas',
        'Experience presenting to a real jury',
        'A permanent entry in their WeThink Digital Footprint',
      ],
    },
    {
      _id: 'domain-2',
      number: 2,
      name: 'Media & Communication',
      partnerName: 'Brut',
      simulatorName: 'The Newsroom',
      status: 'live',
      levels: [
        {
          _key: 'lvl-2-1',
          levelLabel: 'Level 1',
          title: 'The Story',
          description:
            'Students identify a real issue worth covering — local, national, or global — and develop their editorial angle with Brut mentors.',
        },
        {
          _key: 'lvl-2-2',
          levelLabel: 'Level 2',
          title: 'The Craft',
          description:
            'Research, interviews, scripting, and storytelling — students learn what digital journalism actually looks like from the inside.',
        },
        {
          _key: 'lvl-2-3',
          levelLabel: 'Level 3',
          title: 'The Publish',
          description:
            'Teams produce a final media piece — article, video report, or podcast — judged at school level by working journalists.',
        },
        {
          _key: 'lvl-2-4',
          levelLabel: 'Level 4',
          title: 'The Summit',
          description:
            "The best pieces from across India are showcased at the WeThink Summit, with editorial feedback from Brut's team.",
        },
      ],
      outcomes: [
        'A published media piece (article, video, or podcast)',
        'Editorial and production skills',
        'Experience with a real news brief',
        'A permanent entry in their WeThink Digital Footprint',
      ],
    },
    {
      _id: 'domain-3',
      number: 3,
      name: 'Design & Innovation',
      partnerName: 'Canva',
      simulatorName: 'Design Lab',
      status: 'live',
      levels: [
        {
          _key: 'lvl-3-1',
          levelLabel: 'Level 1',
          title: 'The Problem',
          description:
            'Students pick a real-world challenge and frame it as a design problem — with Canva mentors guiding visual thinking frameworks.',
        },
        {
          _key: 'lvl-3-2',
          levelLabel: 'Level 2',
          title: 'The Concept',
          description:
            "From wireframes to mockups: students design their solution using Canva's tools and receive creative direction from working designers.",
        },
        {
          _key: 'lvl-3-3',
          levelLabel: 'Level 3',
          title: 'The Critique',
          description:
            'A live design critique session — students present their work and receive structured feedback from industry designers.',
        },
        {
          _key: 'lvl-3-4',
          levelLabel: 'Level 4',
          title: 'The Summit',
          description:
            "The most compelling design solutions are showcased at the WeThink Summit, judged by a panel from India's design community.",
        },
      ],
      outcomes: [
        'A complete design portfolio piece',
        'Visual thinking and problem-framing skills',
        'Experience with professional design tools',
        'A permanent entry in their WeThink Digital Footprint',
      ],
    },
  ]

  for (const d of domains) {
    await upsert({
      ...d,
      _type: 'domain',
      orderRank: orderRank(d.number),
    })
  }
}

async function seedSummit() {
  console.log('\n🏆 summit')
  await upsert({
    _id: 'summit',
    _type: 'summit',
    heading: 'Where a school project becomes a national moment.',
    pullQuote:
      'Four times a year, the strongest student teams from across India take a national stage — real work, real industry judges, and real recognition that lasts a lifetime.',
    statChips: ['4× per year', 'Pan-India', 'Industry Judges', 'Permanent Record'],
    getInvolvedCards: [
      {
        _key: 'gic-1',
        audience: 'For Students',
        title: 'Earn your place at the Summit',
        description:
          'Complete your domain journey and bring your best work to the national stage.',
        ctaLabel: 'Join your school',
        ctaLink: '#school-form',
      },
      {
        _key: 'gic-2',
        audience: 'For Schools',
        title: 'Send your students to the Summit',
        description:
          'Register your school and give your students a national platform for their work.',
        ctaLabel: 'Register your school',
        ctaLink: '#school-form',
      },
      {
        _key: 'gic-3',
        audience: 'For Partners',
        title: 'Judge, mentor, and shape the Summit',
        description:
          'Bring your expertise to the jury table and help recognise the next generation.',
        ctaLabel: 'Become a partner',
        ctaLink: '#partner-form',
      },
    ],
  })
}

async function seedJourneyIntro() {
  console.log('\n🗺️  journeyIntro')
  await upsert({
    _id: 'journeyIntro',
    _type: 'journeyIntro',
    kicker: 'The journey',
    heading: 'Five stages. One complete experience.',
  })
}

async function seedJourneyStages() {
  console.log('\n🔢 journeyStages')
  const stages = [
    {
      _id: 'journey-1',
      number: 1,
      name: 'OPEN',
      durationLabel: '2 days',
      description:
        'Gamified exposure to a real domain before any training begins — so students choose from experience, not guesswork.',
    },
    {
      _id: 'journey-2',
      number: 2,
      name: 'LIVE',
      durationLabel: '2 weeks',
      description:
        'A live industry project with a real deadline and a real client — the way work actually happens.',
    },
    {
      _id: 'journey-3',
      number: 3,
      name: 'CIRCLE',
      durationLabel: 'Ongoing',
      description:
        'Domain, Process, Peer, and Master Mentors support every student at every stage of the journey.',
    },
    {
      _id: 'journey-4',
      number: 4,
      name: 'SUMMIT',
      durationLabel: '4× / year',
      description:
        'Students pitch their work to a jury of industry partners — four times a year, in front of the country.',
    },
    {
      _id: 'journey-5',
      number: 5,
      name: 'IMPRINT',
      durationLabel: 'Permanent',
      description:
        'A permanent, verifiable Digital Footprint of everything they built, powered by iNEXT.',
    },
  ]

  for (const s of stages) {
    await upsert({
      ...s,
      _type: 'journeyStage',
      orderRank: orderRank(s.number),
    })
  }
}

async function seedEcosystemIntro() {
  console.log('\n🌿 ecosystemIntro')
  await upsert({
    _id: 'ecosystemIntro',
    _type: 'ecosystemIntro',
    kicker: 'Ecosystem partners',
    heading: "Built with the world's leading organisations.",
    subtext:
      "Industry, experience, learning, and knowledge partners — each bringing real briefs, real mentors, and real platforms to India's students.",
  })
}

async function seedPartnerCategories() {
  console.log('\n📂 partnerCategories')
  const categories = [
    {
      _id: 'cat-industry',
      name: 'Industry Partners',
      description: 'Real briefs, real mentors, and the standards students are measured against.',
    },
    {
      _id: 'cat-experience',
      name: 'Experience Partners',
      description: 'Pedagogy and frameworks that keep classrooms current with industry.',
    },
    {
      _id: 'cat-learning',
      name: 'Learning Partners',
      description: 'Educator networks and curriculum integration support.',
    },
    {
      _id: 'cat-knowledge',
      name: 'Knowledge Partners',
      description: 'Research, policy, and institutional knowledge that shapes the programme.',
    },
  ]

  for (let i = 0; i < categories.length; i++) {
    const c = categories[i]
    await upsert({
      ...c,
      _type: 'partnerCategory',
      orderRank: orderRank(i + 1),
    })
  }
}

async function seedCurrentPartners() {
  console.log('\n🤝 currentPartners')
  const partners = [
    {
      _id: 'partner-nasscom',
      name: 'NASSCOM 10,000 Startups',
      type: 'Industry Partner',
      description:
        "India's largest startup ecosystem platform, bringing real startup mentors and briefs to the Entrepreneurship domain.",
      category: { _type: 'reference', _ref: 'cat-industry' },
    },
    {
      _id: 'partner-brut',
      name: 'Brut',
      type: 'Industry Partner',
      description:
        "India's leading digital news platform, bringing editorial mentorship and storytelling expertise to the Media & Communication domain.",
      category: { _type: 'reference', _ref: 'cat-industry' },
    },
    {
      _id: 'partner-canva',
      name: 'Canva',
      type: 'Industry Partner',
      description:
        "The world's leading design platform, bringing professional tools, creative mentors, and design thinking to the Design & Innovation domain.",
      category: { _type: 'reference', _ref: 'cat-industry' },
    },
  ]

  for (let i = 0; i < partners.length; i++) {
    const p = partners[i]
    await upsert({
      ...p,
      _type: 'currentPartner',
      orderRank: orderRank(i + 1),
    })
  }
}

async function seedAdvisoryIntro() {
  console.log('\n🎓 advisoryIntro')
  await upsert({
    _id: 'advisoryIntro',
    _type: 'advisoryIntro',
    kicker: 'Advisory board',
    heading: "Shaped by India's most respected education leaders.",
  })
}

async function seedAdvisoryMembers() {
  console.log('\n👥 advisoryMembers')

  // Announced members
  const announced = [
    {
      _id: 'adv-1',
      number: 1,
      name: 'Dr. Aditi Misra',
      roleOrg: 'Director · DPS Intl — Gurgaon, Jaipur & Dharav High School',
      status: 'member',
      initial: 'A',
      bio: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: "A renowned educationist with over three decades in academic leadership and institution-building. As Director-Principal of DPS Gurugram, she helped shape one of India's leading schools — honoured with the CV Raman Education Award and an honorary doctorate for her dedication to student development.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _id: 'adv-2',
      number: 2,
      name: 'Dr. Amrita Burman',
      roleOrg: 'Director · Sunbeam Group · Education Management Expert',
      status: 'member',
      initial: 'A',
      bio: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'A respected education leader and Director of the Sunbeam Group, with three decades transforming modern education. From primary teacher to institutional leader, she has built a progressive, learner-centric ecosystem — championing global exposure, teacher development, and AI in the classroom.',
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _id: 'adv-3',
      number: 3,
      name: 'Dr. Arunabh Singh',
      roleOrg: 'Director · Nehru World School · Healthy Planet & Cogent',
      status: 'member',
      initial: 'A',
      bio: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: "A renowned education entrepreneur and Director-Principal of Nehru World School, and co-founder of Healthy Planet Preschools. An alumnus of Delhi University and King's College London, he champions digital innovation and emotional well-being in K-12 — advising the British Council, FICCI ARISE, and national policy committees.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _id: 'adv-4',
      number: 4,
      name: 'Lina Ashar',
      roleOrg: 'Founder · Dreamtime Learning, Kangaroo Kids Education Ltd',
      status: 'member',
      initial: 'L',
      bio: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'A pioneering edupreneur and visionary in progressive education. As founder of Kangaroo Kids, Billabong High, and Dreamtime Learning, she has championed creativity, emotional intelligence, and future-ready learning — redefining education through consciousness, innovation, and holistic development for learners globally.',
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _id: 'adv-5',
      number: 5,
      name: 'Lt. Gen. Surendra Kulkarni',
      roleOrg: 'Former Director · Mayo College, Ajmer',
      status: 'member',
      initial: 'S',
      bio: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'A highly decorated Army veteran and education leader who served as Principal and Director of Mayo College from 2015–2024. A recipient of the PVSM, AVSM, and two VSM honours, he blends four decades of military leadership with academic rigour, and now serves as Secretary of the Mayo College General Council.',
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _id: 'adv-6',
      number: 6,
      name: 'Dr. Nandini Srivastava',
      roleOrg: 'Dean · Manav Rachna International Institute of Research',
      status: 'member',
      initial: 'N',
      bio: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Professor and Director of the Council for Doctoral Programs at Manav Rachna International Institute. With 27+ years in management education, HRM, and organisational behaviour, she is a respected researcher and mentor — a SWAYAM contributor with numerous published papers and doctoral scholars guided.',
              marks: [],
            },
          ],
        },
      ],
    },
  ]

  for (const m of announced) {
    await upsert({
      ...m,
      _type: 'advisoryMember',
      orderRank: orderRank(m.number),
    })
  }

  // Announcing-soon seats
  const announcing = [
    { _id: 'adv-7', number: 7, categoryLabel: 'Industry & Startups' },
    { _id: 'adv-8', number: 8, categoryLabel: 'Media & Storytelling' },
    { _id: 'adv-9', number: 9, categoryLabel: 'Design & Innovation' },
    { _id: 'adv-10', number: 10, categoryLabel: 'Education & Pedagogy' },
    { _id: 'adv-11', number: 11, categoryLabel: 'Policy & Public Systems' },
    { _id: 'adv-12', number: 12, categoryLabel: 'Founders & Operators' },
    { _id: 'adv-13', number: 13, categoryLabel: 'Industry & Startups' },
    { _id: 'adv-14', number: 14, categoryLabel: 'Media & Storytelling' },
    { _id: 'adv-15', number: 15, categoryLabel: 'Design & Innovation' },
  ]

  for (const m of announcing) {
    await upsert({
      _id: m._id,
      _type: 'advisoryMember',
      orderRank: orderRank(m.number),
      number: m.number,
      status: 'announcing',
      categoryLabel: m.categoryLabel,
    })
  }
}

async function seedApplyCta() {
  console.log('\n📣 applyCta')
  await upsert({
    _id: 'applyCta',
    _type: 'applyCta',
    heading: 'Build the future of Young Bharat with us.',
    body: "Whether you're a school ready to bring experiential learning to your students, or an organisation that wants to be part of a national movement — we'd love to work with you.",
    primaryCtaLabel: 'Bring WeThink to my school ↗',
    primaryCtaLink: '#school-form',
    secondaryCtaLabel: 'Become a partner ↗',
    secondaryCtaLink: '#partner-form',
  })
}

async function seedSchoolFormConfig() {
  console.log('\n📋 schoolFormConfig')
  await upsert({
    _id: 'schoolFormConfig',
    _type: 'schoolFormConfig',
    labelSchoolName: 'School Name',
    labelContactPerson: 'Contact Person',
    labelDesignation: 'Designation',
    labelEmail: 'Email Address',
    labelContactNumber: 'Contact Number',
    labelCity: 'City',
    labelState: 'State',
    labelBoard: 'Board',
    labelGrades: 'Grades Offered',
    labelStudentRange: 'Number of Students',
    labelTimeline: 'Implementation Timeline',
    labelPrograms: 'Interested Programs',
    labelMessage: 'Additional Message',
    designationOptions: [
      'Principal',
      'Vice Principal',
      'School Administrator',
      'Career Counsellor',
      'Other',
    ],
    boardOptions: ['CBSE', 'ICSE', 'IB', 'Cambridge', 'State Board', 'Other'],
    gradesOptions: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    studentRangeOptions: ['Under 300', '300–800', '800–1,500', '1,500–3,000', '3,000+'],
    timelineOptions: [
      'Within 1 Month',
      '1–3 Months',
      'This Academic Session',
      'Next Academic Session',
      'Flexible',
    ],
    programOptions: ['Entrepreneurship', 'Media & Communication', 'Design & Innovation'],
  })
}

async function seedPartnerFormConfig() {
  console.log('\n📋 partnerFormConfig')
  await upsert({
    _id: 'partnerFormConfig',
    _type: 'partnerFormConfig',
    labelOrgName: 'Organisation Name',
    labelContactPerson: 'Contact Person',
    labelDesignation: 'Designation',
    labelEmail: 'Email Address',
    labelContactNumber: 'Contact Number',
    labelCity: 'City',
    labelState: 'State',
    labelOrgType: 'Organisation Type',
    labelInterestedIn: 'Interested In',
    labelMessage: 'Additional Message',
    designationOptions: [
      'Principal',
      'Vice Principal',
      'School Administrator',
      'Teacher',
      'Founder',
      'Director',
      'CSR Manager',
      'HR Manager',
      'Professor',
      'Student Representative',
      'Other',
    ],
    orgTypeOptions: [
      'School',
      'University / College',
      'Corporate',
      'NGO',
      'Startup',
      'Government Body',
      'Educational Institution',
      'Media',
      'Individual Mentor',
      'Other',
    ],
  })
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 WeThink Bharat — Sanity seed script')
  console.log(`   Project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`   Dataset : ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check your .env.local file.')
    process.exit(1)
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌  SANITY_API_WRITE_TOKEN is not set. Check your .env.local file.')
    process.exit(1)
  }

  try {
    // Singletons
    await seedSiteSettings()
    await seedHero()
    await seedVisionSection()
    await seedBeliefsIntro()
    await seedPathwaysIntro()
    await seedGapSection()
    await seedDomainsIntro()
    await seedJourneyIntro()
    await seedEcosystemIntro()
    await seedAdvisoryIntro()
    await seedApplyCta()
    await seedSummit()
    await seedSchoolFormConfig()
    await seedPartnerFormConfig()

    // Ordered documents
    await seedBeliefs()
    await seedPathways()
    await seedDomains()
    await seedJourneyStages()
    await seedPartnerCategories()
    await seedCurrentPartners()
    await seedAdvisoryMembers()

    console.log('\n✅  Seed complete — all documents created or replaced.')
  } catch (err) {
    console.error('\n❌  Seed failed:', err)
    process.exit(1)
  }
}

// Unused helper kept for potential future use
void block

main()
