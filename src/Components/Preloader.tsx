import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import brandIcon from '../assets/images/icon.webp'

type PreloaderProps = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const wordRefs = useRef<HTMLParagraphElement[]>([]);
  const callbackRef = useRef(onComplete);

  // Keep the latest callback without re-triggering the effect.
  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    const progress = progressRef.current;
    const icon = iconRef.current;
    const words = wordRefs.current.filter(Boolean);

    if (!root || !progress || !icon) return;

    // Skip animation entirely for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => callbackRef.current(), 0);
      return () => window.clearTimeout(id);
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // Defer callback to next tick so React can unmount cleanly.
        requestAnimationFrame(() => callbackRef.current());
      },
    });

    tl.set([icon, ...words], { autoAlpha: 0 })
      .fromTo(
        icon,
        { scale: 0.6, rotation: -90 },
        { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6 },
      )
      .to(
        words,
        { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 },
        "-=0.3",
      )
      .to(progress, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.2)
      .to(root, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, "+=0.1");

    return () => {
      tl.kill();
      // Reset styles so re-mounts (HMR) don't get stuck at opacity 0.
      gsap.set(root, { clearProps: "all" });
      gsap.set(progress, { clearProps: "all" });
      gsap.set(icon, { clearProps: "all" });
      gsap.set(words, { clearProps: "all" });
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading Roop Vihar Resorts"
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#142522] text-white"
    >
      <img
        ref={iconRef}
        src={brandIcon}
        alt="Roop Vihar Resorts"
        className="h-24 w-24 object-contain drop-shadow-[0_0_25px_rgba(185,154,101,0.45)] sm:h-28 sm:w-28"
      />

      <p
        ref={(el) => {
          if (el) wordRefs.current[0] = el;
        }}
        className="mt-6 translate-y-3 font-serif text-2xl tracking-[0.18em] opacity-0"
      >
        ROOP VIHAR
      </p>

      <p
        ref={(el) => {
          if (el) wordRefs.current[1] = el;
        }}
        className="mt-1 translate-y-3 text-[10px] tracking-[0.42em] text-[#D5B780] opacity-0"
      >
        RESORTS · BHAGALPUR
      </p>

      <div className="mt-8 h-px w-[min(72vw,300px)] overflow-hidden bg-white/15">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[#B99A65]"
        />
      </div>
    </div>
  );
}