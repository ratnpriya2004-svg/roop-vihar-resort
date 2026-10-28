import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F6F0E5] px-6 pt-24 text-center">
        <p className="font-serif text-[clamp(5rem,15vw,10rem)] leading-none text-[#B99A65]">
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl text-[#142522]">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm text-[#25302E]/70">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#142522] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white hover:bg-[#28483D]"
        >
          Return home
        </Link>
      </main>
      <Footer />
    </>
  );
}