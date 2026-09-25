// Default copy for /training. Used as the page's fallback when Sanity is empty
// and by sanity/seed-training.ts to pre-fill the trainingPage document.
// || toggles the accent colour on and off: gold in headings, lace in the delivery line.

export const TRAINING_PAGE_DEFAULTS = {
  metaTitle: 'Professional Development for Schools | WeThink Bharat',
  metaDescription:
    "Professional development programmes that equip educators with the tools, technologies and pedagogies today's world demands. Workshops, bootcamps and whole-faculty programmes for K-12 schools and higher-education institutions, online or on campus.",

  heroEyebrow: 'Professional Development for Schools',
  heroHeadline: 'Educators of tomorrow, ||developed today.',
  heroSub:
    "Industry moves fast. Classrooms can too. Our professional development programmes equip educators with the tools, technologies and pedagogies today's world demands, so learning keeps pace with the real one.",
  heroPrimaryCtaLabel: 'Plan a session for your school',
  heroSecondaryCtaLabel: 'Our approach',

  gapHeading: 'Education is running behind industry. ||Educators are where it catches up.',
  gapBody:
    "WeThink Bharat works at the confluence of industry and academia, building an ecosystem that upgrades institutions as a whole: their curriculum, their students' exposure, and the people who teach them. No institutional upgrade lasts without its educators. That's why professional development sits at the core of our work.",
  gapPullLine: 'Do before Be.',

  coverHeading: 'What our sessions ||cover',
  coverTiles: [
    { title: 'Modern tools & technology', description: 'Hands-on fluency with the digital and AI tools reshaping teaching and learning.', icon: 'device-laptop' },
    { title: 'Future-ready pedagogy', description: 'Experiential, project-based and inquiry-led methods that move students from listening to doing.', icon: 'bulb' },
    { title: 'Industry context', description: 'Bringing real-world practice, careers and skills into the subjects educators already teach.', icon: 'building-factory-2' },
    { title: 'Assessment for real skills', description: 'Evaluating process, thinking and application, not just recall.', icon: 'checklist' },
    { title: 'Responsible practice', description: 'Using technology safely and ethically, and protecting student privacy.', icon: 'shield-lock' },
    { title: 'Everyday efficiency', description: 'Less time on prep and admin, more time with students.', icon: 'clock' },
  ],

  approachHeading: 'Our ||approach',
  approachCards: [
    { title: 'Practice over presentation', description: 'Every session is built around doing, and educators work on their own lessons.' },
    { title: 'Designed for your institution', description: 'Programmes shaped to your subjects, grade levels and development goals.' },
    { title: 'Expert-led', description: 'Delivered by certified trainers and practising educators.' },
    { title: 'Immediate impact', description: 'Educators leave with resources they can use in class the next day.' },
  ],

  formatsHeading: 'Programme formats',
  formatsLines: ['Focused workshops', 'Intensive hands-on bootcamps', 'Whole-faculty development programmes'],
  formatsDelivery: 'Delivered ||online or on campus||, for ||K-12 schools and higher-education institutions||.',

  ctaHeading: 'Invest in your ||educators.',
  ctaSub:
    "Tell us about your institution and your faculty's development goals. We'll design sessions around them.",
  ctaButtonLabel: 'Get in touch',
}
