import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Noah Lee Schroeder",
};

const experience = [
  {
    title: "Research Scientist",
    org: "Learn Dialogue Group, University of Florida — College of Engineering",
    period: "July 2024 – Present",
  },
  {
    title: "Professor, Educational Technology & Instructional Design",
    org: "Wright State University",
    period: "August 2021 – June 2024",
    note: "Tenured",
  },
  {
    title: "Associate Professor, Educational Technology & Instructional Design",
    org: "Wright State University",
    period: "August 2018 – July 2021",
    note: "Tenured",
  },
  {
    title: "Assistant Professor, Educational Technology & Instructional Design",
    org: "Wright State University",
    period: "August 2014 – July 2018",
  },
];

const education = [
  {
    degree: "Doctor of Philosophy (Ph.D.)",
    field: "Education",
    institution: "Washington State University",
    year: "2013",
    advisor: "Prof. Olusola Adesope",
  },
  {
    degree: "Master of Arts (M.A.)",
    field: "Education",
    institution: "Washington State University",
    year: "2011",
    advisor: "Prof. Olusola Adesope",
  },
  {
    degree: "Bachelor of Science (B.S.)",
    field: "Biology",
    institution: "Colorado State University – Pueblo",
    year: "2010",
  },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-5xl text-stone-900 tracking-tight mb-3">Experience</h1>
      <p className="text-stone-500 mb-16 text-base leading-relaxed">
        Academic career spanning research, teaching, and software development at
        the intersection of cognitive science, educational technology, and AI.
      </p>

      {/* Professional Experience */}
      <section
        className="mb-16"
        style={{ animation: "fade-up 0.5s ease-out both", animationDelay: "0ms" }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-8">
          Professional Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-teal-100" />

          <div className="flex flex-col gap-10">
            {experience.map((item) => (
              <div key={item.title + item.period} className="pl-7 relative">
                {/* Dot */}
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-teal-500 -translate-x-[3.5px]" />

                <h3 className="font-semibold text-stone-900 text-base leading-snug mb-0.5">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500">{item.org}</p>
                <span className="font-mono text-xs text-stone-400">{item.period}</span>
                {item.note && (
                  <span className="inline-block mt-1.5 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2 py-0.5">
                    {item.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section
        style={{ animation: "fade-up 0.5s ease-out both", animationDelay: "100ms" }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-8">
          Education
        </h2>
        <div className="flex flex-col gap-8">
          {education.map((item) => (
            <div key={item.degree} className="flex gap-6 items-start">
              <span className="font-mono text-sm text-stone-300 shrink-0 w-10 text-right leading-snug mt-0.5">
                {item.year}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900 text-base leading-snug">
                  {item.degree}
                  <span className="font-normal text-stone-500"> — {item.field}</span>
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">{item.institution}</p>
                {item.advisor && (
                  <p className="text-xs text-stone-400 mt-1">Advisor: {item.advisor}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
