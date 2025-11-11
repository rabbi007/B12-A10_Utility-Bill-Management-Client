import { useEffect } from "react";
import { FiShield, FiSmartphone, FiFilter, FiFileText, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import useDocumentTitle from "../Hook/useDocumentTitle";

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs font-medium bg-base-200 dark:bg-white/10">
    {children}
  </span>
);

export default function About() {
  useDocumentTitle('About → Utility Bill Management');
  // auto scroll to top of this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24">
      

      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          About  → <span className="text-[#00A4EF]">Utility Bill Management</span>
        </h1>
        <p className="mt-3 text-base md:text-lg text-base-content/70">
          A modern MERN application to view, filter, and manage monthly utility bills — securely and beautifully.
        </p>
      </section>

      {/* What we do */}
      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-base-500 p-6 bg-white/70 dark:bg-white/5 backdrop-blur">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#00A4EF]/10 text-[#00A4EF]">
            <FiShield size={20} />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Secure by Design</h3>
          <p className="mt-2 text-sm text-base-content/80">
            Firebase Authentication for sign-in and role safety; MongoDB for reliable data storage.
          </p>
        </div>

        <div className="rounded-2xl border border-base-500 p-6 bg-white/70 dark:bg-white/5 backdrop-blur">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#7FBA00]/10 text-[#7FBA00]">
            <FiFilter size={20} />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Fast Browsing & Filters</h3>
          <p className="mt-2 text-sm text-base-content/80">
            Browse all bills in a clean grid; filter by category (Electricity, Gas, Water, Internet) without page reloads.
          </p>
        </div>

        <div className="rounded-2xl border border-base-500 p-6 bg-white/70 dark:bg-white/5 backdrop-blur">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#FFB900]/10 text-[#FFB900]">
            <FiSmartphone size={20} />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Responsive Experience</h3>
          <p className="mt-2 text-sm text-base-content/80">
            Polished UI for mobile, tablet, and desktop — consistent spacing, typography, and card sizes.
          </p>
        </div>
      </section>

      {/* Key features */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Key Features</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-base-500 p-6">
            <div className="flex items-center gap-3 font-semibold">
              <FiCreditCard className="text-[#7FBA00]" /> Pay Current-Month Bills Only
            </div>
            <p className="mt-2 text-sm text-base-content/80">
              For accuracy and control, only bills dated in the <b>current calendar month</b> are payable.
            </p>
          </div>

          <div className="rounded-2xl border border-base-500 p-6">
            <div className="flex items-center gap-3 font-semibold">
              <FiFileText className="text-[#F25022]" /> Download PDF Report
            </div>
            <p className="mt-2 text-sm text-base-content/80">
              Export your <b>My Pay Bills</b> history as a PDF using jsPDF + AutoTable — handy for records or reimbursements.
            </p>
          </div>

          <div className="rounded-2xl border border-base-500 p-6">
            <div className="flex items-center gap-3 font-semibold">
              <FiCheckCircle className="text-[#00A4EF]" /> CRUD & Smart Filtering
            </div>
            <p className="mt-2 text-sm text-base-content/80">
              Clean endpoints for listing, details, creating payments, updating, and deleting — with optional query parameters.
            </p>
          </div>

          <div className="rounded-2xl border border-base-500 p-6">
            <div className="flex items-center gap-3 font-semibold">
              <FiSmartphone className="text-[#FFB900]" /> Real-world Content
            </div>
            <p className="mt-2 text-sm text-base-content/80">
              Seeded with <b>8+ realistic bills</b> to showcase Home (Recent), Bills, and Bill Details flows.
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="mt-12 rounded-2xl border border-base-500">
        <h2 className="text-2xl font-bold ">Tech Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-center items-center justify-center">
          <Pill>MERN (MongoDB • Express • React • Node)</Pill>
          <Pill>Firebase Auth</Pill>
          <Pill>Tailwind CSS + DaisyUI</Pill>
          <Pill>React Router</Pill>
          <Pill>React Toastify • SweetAlert2</Pill>
          <Pill>jsPDF + AutoTable</Pill>
          <Pill>Vercel (Server-side), Netlify (Client-side)</Pill>
        </div>
      </section>
    </main>
  );
}
