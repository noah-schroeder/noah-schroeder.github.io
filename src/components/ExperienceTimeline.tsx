import Link from "next/link";

const positions = [
  {
    title: "Assistant Professor",
    org: "Educational Technology & Instructional Design",
    sub: "Wright State University",
    period: "Aug 2014 – Jul 2018",
  },
  {
    title: "Associate Professor",
    org: "Educational Technology & Instructional Design",
    sub: "Wright State University",
    period: "Aug 2018 – Jul 2021",
    note: "Tenured",
  },
  {
    title: "Professor",
    org: "Educational Technology & Instructional Design",
    sub: "Wright State University",
    period: "Aug 2021 – Jun 2024",
    note: "Tenured",
  },
  {
    title: "Research Scientist",
    org: "Learn Dialogue Group",
    sub: "University of Florida",
    period: "Jul 2024 – Present",
    current: true,
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="bg-white border-t border-stone-100 border-b border-stone-200 pt-6 pb-7">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            Career Progression
          </h2>
          <Link
            href="/experience/"
            className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            Full CV →
          </Link>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal rule */}
          <div className="hidden sm:block absolute top-[9px] left-0 right-0 h-px bg-stone-150"
            style={{ background: "linear-gradient(to right, #e7e5e4 30%, #0d9488)" }}
          />

          <ol className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4">
            {positions.map((pos) => (
              <li key={pos.title} className="relative sm:pt-6">
                {/* Dot */}
                <div
                  className="hidden sm:block absolute top-0 left-0 w-[18px] h-[18px] rounded-full -translate-y-[4px]"
                  style={pos.current ? {
                    background: "#0d9488",
                    boxShadow: "0 0 0 3px white, 0 0 0 5px rgba(13,148,136,0.3)",
                  } : {
                    background: "white",
                    border: "1.5px solid #d6d3d1",
                    boxShadow: "0 0 0 3px white",
                  }}
                />

                {/* Mobile: left-border style */}
                <div className={`sm:hidden pl-4 border-l-2 ${pos.current ? "border-teal-500" : "border-stone-200"}`}>
                  <p className={`text-sm font-semibold leading-snug ${pos.current ? "text-teal-700" : "text-stone-800"}`}>
                    {pos.title}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">{pos.sub}</p>
                  <p className="font-mono text-xs text-stone-400 mt-0.5">{pos.period}</p>
                  {pos.note && (
                    <span className="inline-block mt-1 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2 py-0.5">
                      {pos.note}
                    </span>
                  )}
                </div>

                {/* Desktop */}
                <div className="hidden sm:block">
                  <p className={`text-sm font-semibold leading-snug mb-0.5 ${pos.current ? "text-teal-700" : "text-stone-800"}`}>
                    {pos.title}
                  </p>
                  <p className="text-xs text-stone-500 leading-snug">{pos.sub}</p>
                  <p className="font-mono text-xs text-stone-400 mt-1">{pos.period}</p>
                  {pos.note && (
                    <span className="inline-block mt-1.5 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2 py-0.5">
                      {pos.note}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
