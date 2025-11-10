import {
  FiHelpCircle,
  FiFileText,
  FiCreditCard,
  FiShield,
  FiSliders,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";

export default function FAQ() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">

      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Frequently Asked <span className="text-[#7FBA00]">Questions</span>
        </h1>
        <p className="mt-3 text-base text-base-content/70">
          Quick answers about payments, reports, categories, security, and account actions.
        </p>
      </header>

      <section className="mt-10 space-y-5">
        {/* Each Q&A has its own colorful border */}
        <details
          open
          className="group border-2 border-[#7FBA00] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiCreditCard /> Which bills can I pay?
            </span>
            <span className="ml-3 text-[#7FBA00]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            You can pay <b>only the current month’s</b> bills. If a bill’s date isn’t in the
            current month, the Pay button will be disabled with a helpful message.
          </p>
        </details>

        <details
          open
          className="group border-2 border-[#F25022] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiFileText /> How do I download my payment report?
            </span>
            <span className="ml-3 text-[#F25022]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            Open <b>My Pay Bills</b> and click <b>Download Report</b>. A PDF will be generated
            using jsPDF + AutoTable containing your payments.
          </p>
        </details>

        <details
          open
          className="group border-2 border-[#FFB900] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiSliders /> How do filters work on the Bills page?
            </span>
            <span className="ml-3 text-[#FFB900]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            Use the category dropdown (Electricity, Gas, Water, Internet). The list updates
            instantly; the backend may also support query params for server-side filtering.
          </p>
        </details>

        <details
          open
          className="group border-2 border-[#00A4EF] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiShield /> Is my account secure?
            </span>
            <span className="ml-3 text-[#00A4EF]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            Yes. We use <b>Firebase Authentication</b> for secure login and store data in{" "}
            <b>MongoDB</b>. Private routes remain authenticated on page reload.
          </p>
        </details>

        <details
          open
          className="group border-2 border-[#7FBA00] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiEdit3 /> Can I update my past payments?
            </span>
            <span className="ml-3 text-[#7FBA00]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            Yes. In <b>My Pay Bills</b>, click <b>Update</b> to open a modal with auto-filled
            fields (Amount, Address, Phone, Date). Save to apply changes.
          </p>
        </details>

        <details
          open
          className="group border-2 border-[#F25022] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiTrash2 /> Can I delete a payment entry?
            </span>
            <span className="ml-3 text-[#F25022]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            Yes. Use the <b>Delete</b> button; a confirmation modal will appear to prevent
            accidental deletions.
          </p>
        </details>

        <details
          open
          className="group border-2 border-[#FFB900] rounded-2xl p-5 bg-white/80 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-md transition-all"
        >
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <FiHelpCircle /> Which categories are available?
            </span>
            <span className="ml-3 text-[#FFB900]">●</span>
          </summary>
          <p className="mt-3 text-sm text-base-content/80">
            We support <b>Electricity</b>, <b>Gas</b>, <b>Water</b>, and <b>Internet</b>.
            You’ll also see category cards on the Home page.
          </p>
        </details>
      </section>
    </main>
  );
}
