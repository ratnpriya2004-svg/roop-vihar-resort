import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  heroImage?: string;
};

export default function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  heroImage,
}: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FBF8F2] pt-24 sm:pt-28">
        {/* HERO */}
        <section
          className="relative isolate overflow-hidden border-b border-[#B99A65]/20 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
          style={
            heroImage
              ? {
                  backgroundImage: `linear-gradient(rgba(20,37,34,0.65),rgba(20,37,34,0.85)), url(${heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {!heroImage && (
            <div className="gold-grid-bg pointer-events-none absolute inset-0 bg-[#F6F0E5] opacity-30" />
          )}
          <div className="relative mx-auto max-w-7xl">
            <Link
              to="/"
              className={`group mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] transition ${
                heroImage
                  ? "text-[#D5B780] hover:text-white"
                  : "text-[#8D744A] hover:text-[#142522]"
              }`}
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back home
            </Link>

            {eyebrow && (
              <p
                className={`mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] ${
                  heroImage ? "text-[#D5B780]" : "text-[#8D744A]"
                }`}
              >
                <span className="h-px w-8 bg-[#B99A65]" />
                {eyebrow}
              </p>
            )}

            <h1
              className={`font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-tight ${
                heroImage ? "text-[#F6F0E5]" : "text-[#142522]"
              }`}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${
                  heroImage ? "text-white/85" : "text-[#25302E]/70"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </section>

        {/* BODY */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}