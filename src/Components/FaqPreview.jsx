// src/Components/FaqPreview.jsx
import { Link } from "react-router-dom";
import {
  FiHelpCircle,
  FiFileText,
  FiCreditCard,
  FiShield,
  FiSliders,
} from "react-icons/fi";

const SectionBar = () => (
  <div className="h-1 w-full grid grid-cols-4 mb-10">
    <span className="bg-[#F25022]" />
    <span className="bg-[#7FBA00]" />
    <span className="bg-[#FFB900]" />
    <span className="bg-[#00A4EF]" />
  </div>
);

const QA = ({ color, icon, question, children, open = true }) => (
  <details
    open={open}
    className="group rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all border-2"
    style={{ borderColor: color }}
  >
    <summary className="cursor-pointer font-semibold flex items-center justify-between">
      <span className="inline-flex items-center gap-2">
        {icon} {question}
      </span>
      <span className="ml-3" style={{ color }}>●</span>
    </summary>
    <div className="mt-3 text-sm text-base-content/80">{children}</div>
  </details>
);

export default function FaqPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="rounded-2xl border border-base-300/60 dark:border-base-300/20 p-6  bg-gray-50">
        <SectionBar />
        <h2 className="text-2xl font-bold text-center">Quick FAQs</h2>
        <p className="mt-2 text-sm text-base-content/80 text-center">
          A few common questions — explore the full list on the FAQ page.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <QA
            color="#7FBA00"
            icon={<FiCreditCard className="text-[#7FBA00]" />}
            question="Which bills can I pay?"
          >
            You can pay <b>only the current month’s</b> bills. If a bill’s date isn’t in the
            current month, the Pay button is disabled with a helpful message.
          </QA>

          <QA
            color="#F25022"
            icon={<FiFileText className="text-[#F25022]" />}
            question="How do I download my payment report?"
          >
            Open <b>My Pay Bills</b> and click <b>Download Report</b>. A PDF is generated using
            jsPDF + AutoTable with your payments.
          </QA>

          <QA
            color="#FFB900"
            icon={<FiSliders className="text-[#FFB900]" />}
            question="How do filters work on the Bills page?"
          >
            Use the category dropdown (Electricity, Gas, Water, Internet). The list updates
            instantly; backend may also support query params for server-side filtering.
          </QA>

          <QA
            color="#00A4EF"
            icon={<FiShield className="text-[#00A4EF]" />}
            question="Is my account secure?"
          >
            Yes. We use <b>Firebase Authentication</b> for secure login and store data in{" "}
            <b>MongoDB</b>. Private routes remain authenticated on reload.
          </QA>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="btn bg-[#34a853] hover:bg-[#2c8e46] text-white border-none rounded-xl"
            aria-label="Go to FAQ page for more details"
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
}
