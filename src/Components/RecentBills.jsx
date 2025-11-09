// src/Components/RecentBills.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

const API_ROOT = "https://b12-a10-utility-bill-management-ser.vercel.app";

const RecentBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_ROOT}/latest`);
      if (!res.ok) throw new Error("Failed to fetch latest bills");
      const data = await res.json();
      setBills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Error loading recent bills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  const grid = useMemo(() => {
    if (loading) {
      return (
        <div className="min-h-[200px] flex items-center justify-center">
          <PuffLoader size={50} color="#1a73e8" />
        </div>
      );
    }

    if (!loading && bills.length === 0) {
      return (
        <div className="text-center text-gray-600 dark:text-gray-300">
          No recent bills found.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => {
          const displayDate = bill.date || bill.created_at;
          const formattedDate = displayDate
            ? new Date(displayDate).toLocaleDateString()
            : "N/A";

          return (
            <div
              key={bill._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition rounded-2xl overflow-hidden border"
            >
              <figure className="relative">
                <img
                  src={bill.image}
                  alt={bill.title || "Bill image"}
                  className="w-full h-48 object-cover"
                />
                {bill.category && (
                  <span className="absolute left-3 top-3 text-xs font-semibold bg-white/90 text-gray-900 px-2 py-1 rounded-full shadow">
                    {bill.category}
                  </span>
                )}
              </figure>

              <div className="card-body">
                <h3 className="card-title text-lg font-bold line-clamp-1">
                  {bill.title || "Untitled Bill"}
                </h3>
                <p className="text-sm">
                  <span className="font-medium">Location:</span>{" "}
                  {bill.location || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Date:</span> {formattedDate}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Amount:</span>{" "}
                  {bill.amount !== undefined ? `৳${bill.amount}` : "N/A"}
                </p>

                <div className="mt-3">
                  <Link
                    to={`/bills/${bill._id}`}
                    className="btn w-full bg-[#1a73e8] hover:bg-[#185abc] text-white border-none"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [bills, loading]);

  return (
    <section className="relative py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center justify-between gap-3">
          <div>
            <h2
              className="
                text-2xl md:text-3xl font-extrabold
                bg-clip-text text-transparent
                bg-gradient-to-r from-[#1a73e8] via-[#34a853] to-[#ea4335]
              "
            >
              Recent Bills
            </h2>
            <p className="text-gray-700/90 mt-1">
              The latest 6 issues reported across categories.
            </p>
          </div>
          <Link
            to="/bills"
            className="btn bg-[#1a73e8] hover:bg-[#185abc] text-white border-none"
          >
            View All
          </Link>
        </div>

        {/* Grid / Loader / Empty */}
        {grid}
      </div>

      {/* Google color underline */}
      <div className="h-1.5 w-full flex mt-20">
        <span className="flex-1 bg-[#4285f4]" />
        <span className="flex-1 bg-[#34a853]" />
        <span className="flex-1 bg-[#fbbc05]" />
        <span className="flex-1 bg-[#ea4335]" />
      </div>
    </section>
  );
};

export default RecentBills;
