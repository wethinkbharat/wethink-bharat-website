import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { TrainingEnquiryForm } from '@/components/training/TrainingEnquiryForm'

export const metadata: Metadata = {
  title: 'Professional Development for Schools | WeThink Bharat',
  description:
    "Professional development programmes that equip educators with the tools, technologies and pedagogies today's world demands. Workshops, bootcamps and whole-faculty programmes for K-12 schools and higher-education institutions, online or on campus.",
}

const COVERAGE = [
  { icon: 'ti-device-laptop', title: 'Modern tools & technology', body: 'Hands-on fluency with the digital and AI tools reshaping teaching and learning.' },
  { icon: 'ti-bulb', title: 'Future-ready pedagogy', body: 'Experiential, project-based and inquiry-led methods that move students from listening to doing.' },
  { icon: 'ti-building-factory-2', title: 'Industry context', body: 'Bringing real-world practice, careers and skills into the subjects educators already teach.' },
  { icon: 'ti-checklist', title: 'Assessment for real skills', body: 'Evaluating process, thinking and application, not just recall.' },
  { icon: 'ti-shield-lock', title: 'Responsible practice', body: 'Using technology safely and ethically, and protecting student privacy.' },
  { icon: 'ti-clock', title: 'Everyday efficiency', body: 'Less time on prep and admin, more time with students.' },
]

const APPROACH = [
  { title: 'Practice over presentation', body: 'Every session is built around doing, and educators work on their own lessons.' },
  { title: 'Designed for your institution', body: 'Programmes shaped to your subjects, grade levels and development goals.' },
  { title: 'Expert-led', body: 'Delivered by certified trainers and practising educators.' },
  { title: 'Immediate impact', body: 'Educators leave with resources they can use in class the next day.' },
]

const FORMATS = [
  { icon: 'ti-bolt', title: 'Focused workshops' },
  { icon: 'ti-flame', title: 'Intensive hands-on bootcamps' },
  { icon: 'ti-users-group', title: 'Whole-faculty development programmes' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-3.5 text-[11.5px] font-bold uppercase tracking-[.22em] text-gold">{children}</p>
}

const h2Class = 'm-0 text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-lace'
const sectionClass = 'px-[clamp(20px,6vw,64px)] py-[clamp(64px,9vw,120px)]'

export default function TrainingPage() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[88svh] flex-col overflow-hidden bg-[linear-gradient(150deg,#340F05_0%,#240A03_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-20%] bg-[radial-gradient(ellipse_80%_60%_at_65%_40%,rgba(222,192,120,0.1)_0%,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] top-[18%] hidden h-[clamp(200px,26vw,340px)] w-[clamp(200px,26vw,340px)] animate-[wtbSpin_60s_linear_infinite] rounded-full border border-dashed border-gold/20 md:block"
        />

        <header className="relative z-10 px-[clamp(20px,6vw,64px)] pt-7">
          <Link href="/" className="text-xl font-extrabold tracking-[-0.02em] no-underline">
            <span className="text-lace">wethink</span><span className="text-gold">bharat</span>
          </Link>
        </header>

        <div className="relative z-10 flex flex-1 items-center px-[clamp(20px,6vw,64px)] pb-20 pt-14">
          <div className="max-w-[900px]">
            <ScrollReveal>
              <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[.14em] text-gold">
                <span className="pulse h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                Professional Development for Schools
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-hero-lg m-0 mb-7 text-lace">
                Educators of tomorrow, <span className="text-gold">developed today.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body-lg m-0 mb-10 max-w-[620px] text-almond">
                Industry moves fast. Classrooms can too. Our professional development programmes equip educators with the tools, technologies and pedagogies today&apos;s world demands, so learning keeps pace with the real one.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a href="#enquire" className="btn-gold justify-center">Plan a session for your school</a>
                <a href="#approach" className="btn-ghost justify-center">Our approach</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <section className={`${sectionClass} bg-mahogany`}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal>
            <SectionLabel>The gap</SectionLabel>
            <h2 className={h2Class}>
              Education is running behind industry. <span className="text-gold">Educators are where it catches up.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="m-0 text-body-md text-almond lg:pt-9">
              WeThink Bharat works at the confluence of industry and academia, building an ecosystem that upgrades institutions as a whole: their curriculum, their students&apos; exposure, and the people who teach them. No institutional upgrade lasts without its educators. That&apos;s why professional development sits at the core of our work.
            </p>
            <p className="font-georgia m-0 mt-9 border-l-2 border-gold pl-5 text-[clamp(26px,3vw,38px)] italic leading-tight text-gold">
              Do before Be.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* WHAT OUR PD COVERS */}
      <section className={`${sectionClass} bg-mahogany-deep`}>
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <h2 className={`${h2Class} mb-10`}>
              What our sessions <span className="text-gold">cover</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {COVERAGE.map((c, i) => (
              <ScrollReveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-[18px] border border-gold/15 bg-[linear-gradient(160deg,#340F05,#2A0E05)] p-7 transition-colors duration-200 hover:border-gold/40">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-[22px] text-gold">
                    <i className={`ti ${c.icon}`} aria-hidden="true" />
                  </span>
                  <h3 className="m-0 mb-2 text-lg font-extrabold text-lace">{c.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-almond">{c.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section id="approach" className={`${sectionClass} scroll-mt-4 bg-mahogany`}>
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <h2 className={`${h2Class} mb-10`}>
              Our <span className="text-gold">approach</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {APPROACH.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.08}>
                <div className="h-full border-t border-gold/25 pt-6">
                  <div className="mb-4 text-[clamp(40px,4vw,56px)] font-extrabold leading-none tracking-[-0.03em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="m-0 mb-2 text-lg font-extrabold text-lace">{a.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-almond">{a.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME FORMATS */}
      <section className={`${sectionClass} bg-mahogany-deep`}>
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <div className="rounded-[20px] border border-gold/20 bg-[linear-gradient(120deg,#340F05,#2A0E05)] p-[clamp(24px,4vw,48px)]">
              <SectionLabel>Programme formats</SectionLabel>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {FORMATS.map((f) => (
                  <div key={f.title} className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-mahogany-dark/60 px-5 py-5">
                    <i className={`ti ${f.icon} text-2xl text-gold`} aria-hidden="true" />
                    <span className="text-[17px] font-bold leading-snug text-lace">{f.title}</span>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-7 text-body-sm text-almond">
                Delivered <span className="text-lace">online or on campus</span>, for <span className="text-lace">K-12 schools and higher-education institutions</span>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className={`${sectionClass} scroll-mt-4 bg-[linear-gradient(150deg,#340F05_0%,#240A03_100%)]`}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <h2 className={`${h2Class} mb-5`}>
              Invest in your <span className="text-gold">educators.</span>
            </h2>
            <p className="m-0 max-w-[460px] text-body-md text-almond">
              Tell us about your institution and your faculty&apos;s development goals. We&apos;ll design sessions around them.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-[22px] border border-gold/25 bg-[linear-gradient(150deg,#340F05,#240A03)] p-[clamp(20px,4vw,44px)] shadow-[0_40px_100px_-30px_rgba(0,0,0,.8)]">
              <TrainingEnquiryForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 bg-mahogany-deep px-[clamp(20px,6vw,64px)] pb-10 pt-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-[-0.02em] no-underline">
            <span className="text-lace">wethink</span><span className="text-gold">bharat</span>
          </Link>
          <p className="m-0 text-[13px] text-almond/50">
            © {new Date().getFullYear()} WeThink Bharat. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
