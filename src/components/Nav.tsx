"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/software/", label: "Software" },
  { href: "/learn/", label: "Learn" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-base tracking-wide text-stone-900 hover:text-teal-600 transition-colors"
        >
          Noah Schroeder
        </Link>
        <div className="flex items-center gap-7">
          <ul className="flex gap-7">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative text-sm font-medium transition-colors
                    after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full
                    after:origin-left after:scale-x-0 after:rounded-full after:bg-teal-600
                    after:transition-transform after:duration-200
                    hover:after:scale-x-100 hover:text-stone-900
                    ${pathname === href
                      ? "text-teal-600 after:scale-x-100"
                      : "text-stone-500"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-stone-200 pl-7">
            <a
              href="https://www.linkedin.com/in/4noahschroeder/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone-400 hover:text-teal-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:schroedern@ufl.edu"
              aria-label="Email"
              className="text-stone-400 hover:text-teal-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
