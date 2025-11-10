// src/Components/AboutPreview.jsx
import { Link } from "react-router-dom";
import {
  FiShield,
  FiSmartphone,
  FiFilter,
  FiFileText,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";


export default function AboutPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10  bg-gray-50">
      <div className="p-6 bg-gray-50 dark:bg-white/5 backdrop-blur">
      
        {/* Heading + sub */}
        <div className="mb-5  text-center">
          <h2 className="text-2xl font-bold ">
            About → <span className="text-[#00A4EF]">Utility Bill Management</span>
          </h2>
          <p className="mt-2 text-sm text-base-content/80">
            A modern MERN application to view, filter, and manage monthly utility bills — securely and beautifully.
          </p>
        </div>

        {/* What we do (condensed 3 cards) */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-base-500 p-4 bg-white/70 dark:bg-white/5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00A4EF]/10 text-[#00A4EF]">
              <FiShield size={18} />
            </div>
            <h3 className="mt-3 text-base font-semibold">Secure by Design</h3>
            <p className="mt-1 text-xs text-base-content/80">
              Firebase Authentication for sign-in; MongoDB for reliable storage.
            </p>
          </div>

          <div className="rounded-xl border border-base-500  p-4 bg-white/70 dark:bg-white/5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#7FBA00]/10 text-[#7FBA00]">
              <FiFilter size={18} />
            </div>
            <h3 className="mt-3 text-base font-semibold">Fast Browsing & Filters</h3>
            <p className="mt-1 text-xs text-base-content/80">
              Clean grid + category filters (Electricity, Gas, Water, Internet).
            </p>
          </div>

          <div className="rounded-xl border border-base-500 p-4 bg-white/70 dark:bg-white/5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFB900]/10 text-[#FFB900]">
              <FiSmartphone size={18} />
            </div>
            <h3 className="mt-3 text-base font-semibold">Responsive Experience</h3>
            <p className="mt-1 text-xs text-base-content/80">
              Polished for mobile, tablet, and desktop.
            </p>
          </div>
        </div>

       
        {/* CTA */}
        <div className="mt-10  text-center">
          <Link
            to="/about"
            className="btn bg-[#34a853] hover:bg-[#2c8e46] text-white border-none rounded-xl"
            aria-label="Go to About page for more details"
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
}
