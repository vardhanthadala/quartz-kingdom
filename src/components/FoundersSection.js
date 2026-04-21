'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const founders = [
  {
    index: '01',
    name: 'V. Siva Prasad',
    role: 'Founder & Visionary Leader',
    year: 'Est. 1998',
    bio: 'The driving force behind Quartz Kingdom\'s commitment to global excellence. With decades of industry foresight, he has transformed raw mineral potential into a high-technology supply chain staple. His unwavering focus on quality and long-term partnerships has built the enduring reputation the company holds today.',
    stats: [
      { value: '25+', label: 'Years of leadership' },
      { value: '40+', label: 'Global markets' },
      { value: '3×', label: 'Industry awards' },
    ],
    links: [
      { label: '↗ LinkedIn Profile', href: '#' },
      { label: '↗ Company Vision', href: '#' },
    ],
  },
  {
    index: '02',
    name: 'Depuru Ravindra Reddy',
    role: 'Co-Founder & Mining Expert',
    year: 'Est. 1998',
    bio: 'A veteran in mining geology and mineral resources with hands-on expertise in sustainable extraction. His deep understanding of geological formations ensures that every gram of quartz meets rigorous purity standards, forming the technical backbone of the company\'s operations.',
    stats: [
      { value: '99.9%', label: 'Purity standard' },
      { value: '12', label: 'Active mining sites' },
      { value: '20+', label: 'Years in geology' },
    ],
    links: [
      { label: '↗ LinkedIn Profile', href: '#' },
      { label: '↗ Technical Papers', href: '#' },
    ],
  },
  {
    index: '03',
    name: 'Hari Prasad Pamuru',
    role: 'Executive Partner',
    year: 'Est. 2000',
    bio: 'Bringing 36 years of expertise in finance and administration. His operational precision forms the backbone of our transparent and reliable partner relationships worldwide. He oversees compliance, financial strategy, and the robust audit frameworks that sustain investor confidence.',
    stats: [
      { value: '36', label: 'Years of expertise' },
      { value: '$200M+', label: 'Capital managed' },
      { value: '100%', label: 'Compliance record' },
    ],
    links: [
      { label: '↗ LinkedIn Profile', href: '#' },
      { label: '↗ Financial Reports', href: '#' },
    ],
  },
  {
    index: '04',
    name: 'Sri Vatsav Vempuluru',
    role: 'Director',
    year: 'Est. 2005',
    bio: 'Leading our strategic initiatives and global expansion. Focused on bridge-building between industrial needs and our refined material innovations. His sharp market acumen and partnership-first approach have opened key corridors in Asia, Europe, and North America.',
    stats: [
      { value: '15+', label: 'Strategic partnerships' },
      { value: '3', label: 'Continents active' },
      { value: '50+', label: 'Clients onboarded' },
    ],
    links: [
      { label: '↗ LinkedIn Profile', href: '#' },
      { label: '↗ Partnership Deck', href: '#' },
    ],
  },
];

// ─── Arrow icon ───
function ArrowIcon({ rotated }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{
        transition: 'transform 0.35s cubic-bezier(0.77,0,0.175,1)',
        transform: rotated ? 'rotate(45deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <line x1="2" y1="7" x2="12" y2="7" />
      <polyline points="7,2 12,7 7,12" />
    </svg>
  );
}

// ─── Avatar placeholder ───
const AVATAR_COLORS = ['#9FE1CB', '#1D9E75', '#B2DFDB', '#80CBC4'];

function AvatarPlaceholder({ index }) {
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <svg viewBox="0 0 52 52" width="52" height="52" xmlns="http://www.w3.org/2000/svg" style={{ background: bg, borderRadius: '50%' }}>
      <circle cx="26" cy="20" r="10" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="26" cy="46" rx="16" ry="12" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

// ─── Single Founder Row (renders as <li> itself) ───
function FounderRow({ founder, idx, openIdx, onToggle }) {
  const isOpen = openIdx === idx;
  const rowRef = useRef(null);
  const expandedRef = useRef(null);
  const innerRef = useRef(null);
  const statRefs = useRef([]);

  const ROW_H = 120; // Increased height to accommodate padding
  const EXPAND_H = 320;

  const handleClick = useCallback(() => {
    onToggle(idx);
  }, [idx, onToggle]);

  // Animate open/close whenever isOpen changes
  useGSAP(() => {
    if (!innerRef.current || !expandedRef.current) return;

    let mm = gsap.matchMedia();
    let current_row_h;


    if (window.innerWidth < 640) {
      current_row_h = 120;
    } else if (window.innerWidth >= 1400 && window.innerWidth <= 1500) {
      current_row_h = 230;
    } else {
      current_row_h = 210;
    }
    if (isOpen) {
      // Expand
      gsap.to(innerRef.current, {
        height: 'auto',
        duration: 0.6,
        ease: 'power3.inOut',
      });
      gsap.to(expandedRef.current, {
        opacity: 1,
        y: 0,
        height: 'auto',
        duration: 0.45,
        delay: 0.25,
        ease: 'power2.out',
      });
      // Count-up stats
      statRefs.current.forEach((sv) => {
        if (!sv) return;
        const raw = sv.dataset.raw || '';
        const match = raw.match(/[\d.]+/);
        if (match) {
          const end = parseFloat(match[0]);
          const prefix = raw.slice(0, raw.indexOf(match[0]));
          const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration: 1.2,
            delay: 0.35,
            ease: 'power2.out',
            onUpdate: () => {
              sv.textContent =
                prefix +
                (Number.isInteger(end) ? Math.round(obj.val) : obj.val.toFixed(1)) +
                suffix;
            },
          });
        }
      });
    } else {
      // Collapse
      gsap.to(expandedRef.current, {
        opacity: 0,
        y: 16,
        height: 0,
        duration: 0.3
      });
      gsap.to(innerRef.current, {
        height: current_row_h,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(innerRef.current, { clearProps: 'height' });
        }
      });
    }

    return () => mm.revert();
  }, [isOpen]);

  return (
    <>
      <div
        ref={rowRef}
        onClick={handleClick}
        style={{
          position: 'relative',
          border: '1.5px solid #f1f5f9',
          borderRadius: '12px',
          background: isOpen ? '#fcfdfd' : '#ffffff',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? '0 10px 30px -10px rgba(0,0,0,0.05)' : 'none',
        }}
        className="hover:border-[#1D9E75]/30 hover:shadow-sm"
      >
        <div
          ref={innerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'var(--row-h-mobile, 90px)', // Dynamic height
            overflow: 'hidden',
            transition: 'background 0.2s',
          }}
        className="founder-row-inner group md:mt-18 md:px-4 xl:mb-2 2xl:mt-30 2xl:mb-15"
        >
          <style jsx>{`
          @media (min-width: 768px) and (max-width: 1024px) {
  .founder-row-inner {
    --row-h: 160px;              /* reduce height */
    padding: 1.5rem clamp(1rem, 3vw, 2.5rem); /* reduce top gap */
  }
}
          .founder-row-inner {
            --row-h: 210px;
            height: var(--row-h);
            padding: 3rem clamp(1rem, 3vw, 2.5rem);
          }
          @media (min-width: 1400px) and (max-width: 1500px) {
            .founder-row-inner {
              --row-h: 230px; 
              padding: 3.5rem clamp(1rem, 3vw, 2.5rem);
            }
          }
          @media (max-width: 639px) {
            .founder-row-inner {
              --row-h: 120px;
              padding: 1.5rem clamp(1rem, 3vw, 2.5rem);
            }
          }
        `}</style>
          {/* HEADER AREA - Perfect Vertical Centering */}
          <div
            className="founder-header-row-qk"
            style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(30px, 4vw, 44px) clamp(40px, 5vw, 52px) 1fr auto auto',
              alignItems: 'center',
              gap: 'clamp(0.8rem, 2vw, 1.5rem)',
              minHeight: 'var(--row-h)',
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(9px, 1vw, 11px)',
                fontStyle: 'italic',
                color: isOpen ? '#1D9E75' : '#94a3b8',
                flexShrink: 0,
                transition: 'color 0.3s',
              }}
            >
              {founder.index}
            </span>

            {/* Avatar */}
            <div
              className="founder-avatar-qk"
              style={{
                width: 'clamp(40px, 5vw, 52px)',
                height: 'clamp(40px, 5vw, 52px)',
                borderRadius: '50%',
                overflow: 'hidden',
                outline: isOpen ? '2px solid #1D9E75' : '2px solid transparent',
                outlineOffset: 3,
                transition: 'outline-color 0.3s',
                flexShrink: 0,
              }}
            >
              <AvatarPlaceholder index={idx} />
            </div>

            {/* Name + Role */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
              }}
            >
              <span
                className="founder-name-text"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(1.3rem, 4vw, 2.8rem)', // Increased size
                  fontWeight: 700,
                  color: isOpen ? '#0f172a' : '#1e293b',
                  letterSpacing: '-0.03em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'color 0.3s',
                  lineHeight: 1.1, // Tighter line-height for bold names
                }}
              >
                {founder.name}
              </span>
              <div style={{ marginTop: '0.3rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: 'clamp(8px, 0.9vw, 10px)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isOpen ? '#1D9E75' : '#64748b',
                    border: `1px solid ${isOpen ? '#1D9E75' : '#e2e8f0'}`,
                    padding: '1px 6px',
                    borderRadius: 99,
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    transition: 'all 0.3s',
                  }}
                >
                  {founder.role}
                </span>
              </div>
            </div>

            {/* Year */}
            <span
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(9px, 1vw, 11px)',
                fontWeight: 400,
                color: '#94a3b8',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
              className="hidden md:inline"
            >
              {founder.year}
            </span>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(9px, 1vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isOpen ? '#1D9E75' : '#94a3b8',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="hidden sm:inline">{isOpen ? 'Close' : 'View'}</span>
              <ArrowIcon rotated={isOpen} />
            </div>
          </div>

          {/* EXPANDED CONTENT AREA */}
          <div
            ref={expandedRef}
            style={{
              opacity: 0,
              transform: 'translateY(16px)',
              height: 0,
              overflow: 'hidden',
              paddingBottom: '3rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr 240px',
                gap: 'clamp(1.5rem, 4vw, 4rem)',
                alignItems: 'start',
                paddingTop: '1rem',
              }}
              className="expanded-grid-qk"
            >
              {/* Bio */}
              <p
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', // Increased body size
                  fontWeight: 300,
                  lineHeight: 2, // More airy line-height
                  color: '#475569',
                  gridColumn: 'span 1',
                  maxWidth: '65ch',
                }}
              >
                <strong style={{ color: '#0f172a', fontWeight: 600 }}>{founder.name}</strong>{' '}
                {founder.bio}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {founder.stats.map((stat, si) => (
                  <div
                    key={si}
                    style={{
                      borderLeft: '2px solid #9FE1CB',
                      paddingLeft: '0.9rem',
                    }}
                  >
                    <div
                      ref={(el) => (statRefs.current[si] = el)}
                      data-raw={stat.value}
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', // Scaled up stats
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: 10,
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#94a3b8',
                        marginTop: 3,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {founder.links.map((link, li) => (
                  <a
                    key={li}
                    href={link.href}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#475569',
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                      padding: '0.45rem 0.75rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: 4,
                      transition: 'border-color 0.25s, color 0.25s, background 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1D9E75';
                      e.currentTarget.style.color = '#1D9E75';
                      e.currentTarget.style.background = '#f0fdf4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Section ───
export default function FoundersSection() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(null);

  const handleToggle = useCallback((idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }, []);

  useGSAP(() => {
    // Header animations
    gsap.from('.founders-eyebrow-qk', {
      opacity: 0,
      x: -20,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.founders-headline-qk', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    gsap.from('.founders-sub-qk', {
      opacity: 0,
      y: 20,
      duration: 0.7,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    gsap.from('.founders-count-qk', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    // Divider wipe
    if (dividerRef.current) {
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 90%',
        },
      });
    }

    // Rows stagger
    gsap.from('.fnd-row-anim', {
      opacity: 0,
      y: 28,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.founders-list-qk',
        start: 'top 82%',
      },
    });

    // Footer note
    gsap.to('.founders-footer-qk', {
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.founders-footer-qk',
        start: 'top 95%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="founders"
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '0 6vw',
        borderTop: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
    >
      {/* Subtle radial BG */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.04,
          background:
            'radial-gradient(circle at top left, #9FE1CB 0%, transparent 50%), radial-gradient(circle at bottom right, #1D9E75 0%, transparent 50%)',
        }}
      />

      <div
        style={{
          maxWidth: '1800px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* ─── Header ─── */}
        <div
          style={{
            paddingTop: '10vh',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'end',
            gap: 'clamp(1rem, 3vw, 4rem)',
            marginBottom: '5vh',
          }}
          className="founders-header-grid"
        >
          <div>
            {/* Eyebrow */}
            <div
              className="founders-eyebrow-qk"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1D9E75',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 28,
                  height: 1,
                  background: '#1D9E75',
                }}
              />
              About us
            </div>

            {/* Headline */}
            <h2
              className="founders-headline-qk"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(2.2rem, 6vw, 6rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                userSelect: 'none',
              }}
            >
              The<br />Founders
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '1.2rem',
            }}
          >
            {/* Decorative count */}
            <span
              className="founders-count-qk"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 800,
                fontStyle: 'italic',
                color: '#0f172a',
                lineHeight: 1,
                opacity: 0.07,
              }}
            >
              04
            </span>

            {/* Subtext */}
            <p
              className="founders-sub-qk"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.7,
                color: '#64748b',
                maxWidth: 300,
                textAlign: 'right',
              }}
            >
              Four visionaries who built Quartz Kingdom from the earth up — their combined
              expertise forms the backbone of everything we do.
            </p>
          </div>
        </div>

        {/* ─── Top Divider ─── */}
        <div
          ref={dividerRef}
          style={{
            height: 1,
            background: '#e2e8f0',
            transformOrigin: 'left',
            marginBottom: 0,
          }}
        />

        {/* ─── Founders List ─── */}
        <div
          className="founders-list-qk"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: 0,
            paddingBottom: '10vh'
          }}
        >
          {founders.map((founder, i) => (
            <div key={i} className="fnd-row-anim">
              <FounderRow
                founder={founder}
                idx={i}
                openIdx={openIdx}
                onToggle={handleToggle}
              />
            </div>
          ))}
        </div>

        {/* ─── Footer Note ─── */}
        <p
          className="founders-footer-qk"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: 11,
            fontWeight: 300,
            color: '#94a3b8',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'right',
            padding: '2rem 0 6vh',
            opacity: 0,
          }}
        >
          © 2025 &nbsp;·&nbsp; Quartz Kingdom &nbsp;·&nbsp; Building since 1998 &nbsp;·&nbsp; India
        </p>

        {/* ─── Responsive overrides ─── */}
        <style>{`
        @media (max-width: 640px) {
          .founders-header-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .founders-header-grid > div:last-child {
            align-items: flex-start !important;
          }
          .founders-header-grid .founders-count-qk {
            display: none !important;
          }
          .founders-header-grid .founders-sub-qk {
            text-align: left !important;
          }
        }
        @media (max-width: 480px) {
          .founder-header-row-qk {
            grid-template-columns: 30px 40px 1fr 30px !important;
            gap: 0.8rem !important;
          }
          .founder-avatar-qk {
            width: 40px !important;
            height: 40px !important;
          }
          .founder-row-inner {
            padding: 0 1rem !important;
          }
        }
        @media (max-width: 380px) {
           .founder-header-row-qk {
             grid-template-columns: 24px 32px 1fr 24px !important;
             gap: 0.5rem !important;
           }
           .founder-avatar-qk {
             width: 32px !important;
             height: 32px !important;
           }
        }
        /* suppress any cursor:none from parent pages on this section's interactive bits */
        #founders *, #founders a, #founders button, #founders li {
          cursor: pointer;
        }
        #founders a {
          cursor: pointer;
        }
        #founders p, #founders span, #founders h2, #founders div:not([onClick]) {
          cursor: default;
        }
        #founders li {
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .expanded-grid-qk {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
      </div>
    </section>
  );
}