import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, ArrowUpRight, BadgeCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Dhiraj Pandey",
    location: "Google Review",
    rating: 5,
    review: "It's a nice place... good food, service is superb.",
    occasion: "Stay",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Bala Jee",
    location: "Google Review",
    rating: 4,
    review: "I have been there multiple times, food is delicious and staff behaviour is also very good.",
    occasion: "Friends",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Anjali Textiles",
    location: "Google Review",
    rating: 4,
    review: "Interior is awesome and satisfactory. You will feel good when you visit there.",
    occasion: "Visit",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Naween Kumar",
    location: "Google Review",
    rating: 5,
    review: "Beautiful decoration & price with food. Very nice service.",
    occasion: "Celebration",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Swarnava Mitra",
    location: "Google Review",
    rating: 4,
    review: "Good place for marriage functions and other events. One of the oldest in Bhagalpur and would count in the best.",
    occasion: "Events",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Rishabh Dev",
    location: "Google Review",
    rating: 4,
    review: "The location is at a great place. There is a swimming pool to roam around. The food is good and the services are also good.",
    occasion: "Family",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Govind Kumar",
    location: "Google Review",
    rating: 5,
    review: "Thank you for providing us this type of service at home. Very helpful team.",
    occasion: "Service",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Rafat Aafreen",
    location: "Google Review",
    rating: 4,
    review: "Beautiful place with delicious food. Ambiance is good overall and service staff is attentive.",
    occasion: "Friends",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Rahul Singh",
    location: "Google Review",
    rating: 5,
    review: "Best place to visit with your loved ones. The service is fast, the food is also good and the decorations were perfect.",
    occasion: "Couple",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Pranav Mishra",
    location: "Google Review",
    rating: 5,
    review: "Best in town, especially if you have kids with you. Plenty of space to enjoy, tasty food and fast service.",
    occasion: "Family",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
  },
];

const rowOne = testimonials.slice(0, 5);
const rowTwo = testimonials.slice(5);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeOneRef = useRef<HTMLDivElement>(null);
  const marqueeTwoRef = useRef<HTMLDivElement>(null);

  const tweenOneRef = useRef<gsap.core.Tween | null>(null);
  const tweenTwoRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { yPercent: 5, scale: 0.985 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.from(".testimonial-heading > *", {
        y: 35,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-heading",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".featured-quote", {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-quote",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".marquee-row", {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".marquee-wrap",
          start: "top 88%",
          once: true,
        },
      });

      const m1 = marqueeOneRef.current;
      const m2 = marqueeTwoRef.current;

      if (m1) {
        const width1 = m1.scrollWidth / 2;
        tweenOneRef.current = gsap.to(m1, {
          x: -width1,
          duration: 50,
          repeat: -1,
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % width1),
          },
        });
      }

      if (m2) {
        const width2 = m2.scrollWidth / 2;
        gsap.set(m2, { x: -width2 });
        tweenTwoRef.current = gsap.to(m2, {
          x: 0,
          duration: 60,
          repeat: -1,
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % width2),
          },
        });
      }

      gsap.to(".star-pulse", {
        scale: 1.18,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.08,
      });

      gsap.to(".testimonial-orbit", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }, section);

    return () => {
      tweenOneRef.current?.kill();
      tweenTwoRef.current?.kill();
      ctx.revert();
    };
  }, []);

  const handleEnter = (tween: gsap.core.Tween | null) => {
    if (!tween) return;
    gsap.to(tween, { timeScale: 0, duration: 0.6, ease: "power2.out" });
  };

  const handleLeave = (tween: gsap.core.Tween | null) => {
    if (!tween) return;
    gsap.to(tween, { timeScale: 1, duration: 0.8, ease: "power2.out" });
  };

  const featured = testimonials[0];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative isolate overflow-hidden bg-[#FBF8F2] px-5 py-20 sm:px-8 sm:py-24 lg:px-0 lg:py-28"
    >
      <div className="gold-grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="testimonial-orbit pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full border border-[#D7B879]/25 sm:h-[560px] sm:w-[560px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#B99A65]/15 blur-[100px]"
      />

      <div className="relative">
        <div className="testimonial-heading mx-auto mb-12 max-w-7xl text-center sm:mb-16 lg:px-12">
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9B7940] sm:text-xs">
            <span className="h-px w-8 bg-[#B99A5A]" /> Guest Experiences{" "}
            <span className="h-px w-8 bg-[#B99A5A]" />
          </span>
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.02] text-[#25302E]">
            Moments That
            <span className="block italic text-[#A98545]">Stay With You</span>
          </h2>
          <p className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-sm leading-7 text-[#25302E]/70 sm:text-base">
            <BadgeCheck size={16} className="text-[#B99A5A]" />
            Verified reviews from Google
          </p>
        </div>

        <div className="featured-quote mx-auto mb-14 max-w-7xl sm:mb-16 lg:px-12">
          <div className="rounded-3xl border border-[#B99A5A]/30 bg-white/90 p-7 shadow-[0_20px_60px_rgba(67,49,20,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={featured.avatar}
                  alt={featured.name}
                  loading="lazy"
                  className="h-28 w-28 rounded-full border-4 border-[#D7B879]/60 object-cover shadow-lg sm:h-32 sm:w-32"
                />
                <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#B99A5A] text-white shadow-md">
                  <Quote size={16} fill="currentColor" />
                </span>
              </div>

              <div className="text-center lg:text-left">
                <div className="mb-3 flex justify-center gap-1 text-[#B99A5A] lg:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="star-pulse"
                      fill={i < featured.rating ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <p className="font-serif text-2xl italic leading-snug text-[#25302E] sm:text-3xl lg:text-4xl">
                  “{featured.review}”
                </p>

                <div className="mt-5 flex flex-col items-center gap-1 lg:items-start">
                  <h3 className="text-base font-semibold text-[#25302E] sm:text-lg">
                    {featured.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8A6B36]">
                    {featured.occasion} · {featured.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="marquee-wrap relative w-full overflow-hidden">
          <div className="marquee-row relative py-3">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FBF8F2] to-transparent sm:w-32"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FBF8F2] to-transparent sm:w-32"
              aria-hidden="true"
            />
            <div
              ref={marqueeOneRef}
              className="flex w-max gap-5 will-change-transform sm:gap-6"
              onMouseEnter={() => handleEnter(tweenOneRef.current)}
              onMouseLeave={() => handleLeave(tweenOneRef.current)}
              onTouchStart={() => handleEnter(tweenOneRef.current)}
              onTouchEnd={() => handleLeave(tweenOneRef.current)}
            >
              {[...rowOne, ...rowOne].map((item, i) => (
                <ReviewCard key={`r1-${i}`} item={item} />
              ))}
            </div>
          </div>

          <div className="marquee-row relative py-3">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FBF8F2] to-transparent sm:w-32"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FBF8F2] to-transparent sm:w-32"
              aria-hidden="true"
            />
            <div
              ref={marqueeTwoRef}
              className="flex w-max gap-5 will-change-transform sm:gap-6"
              onMouseEnter={() => handleEnter(tweenTwoRef.current)}
              onMouseLeave={() => handleLeave(tweenTwoRef.current)}
              onTouchStart={() => handleEnter(tweenTwoRef.current)}
              onTouchEnd={() => handleLeave(tweenTwoRef.current)}
            >
              {[...rowTwo, ...rowTwo].map((item, i) => (
                <ReviewCard key={`r2-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <Star size={14} className="fill-[#B99A5A] text-[#B99A5A]" />
            <span className="font-serif text-lg text-[#25302E]">4.0</span>
            <span className="text-xs text-[#25302E]/60">· 770+ reviews</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#25302E]/50">
            Google Reviews · Roop Vihar Resorts, Bhagalpur
          </p>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  item,
}: {
  item: (typeof testimonials)[number];
}) {
  return (
    <article className="group relative flex w-[300px] shrink-0 flex-col rounded-2xl border border-[#B99A5A]/25 bg-white/85 p-6 shadow-[0_10px_40px_rgba(67,49,20,0.05)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#B99A5A]/70 hover:shadow-[0_24px_55px_rgba(67,49,20,0.14)] sm:w-[340px] sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 text-[#B99A5A]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < item.rating ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <Quote
          size={24}
          strokeWidth={1.2}
          className="text-[#D7B879]/70 transition-transform duration-500 group-hover:rotate-12"
        />
      </div>

      <p className="flex-1 font-serif text-base leading-7 text-[#25302E] sm:text-lg">
        “{item.review}”
      </p>

      <div className="my-5 h-px w-full bg-gradient-to-r from-[#D7B879]/70 via-[#D7B879]/30 to-transparent" />

      <div className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-full border-2 border-[#D7B879]/60 object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[#25302E]">
            {item.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-[#25302E]/60">
            {item.location}
          </p>
        </div>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-[#B99A5A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </article>
  );
}