import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

const API_BASE = "https://b12-a10-utility-bill-management-ser.vercel.app/bills";
const CATEGORIES = ["All", "Electricity", "Gas", "Water", "Internet"];

const Bills = () => {

    // auto scroll to top of this page
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  const category = searchParams.get("category") || "All";

  // Fetch bills data (with optional category filter)
  const fetchBills = async (cat) => {
    setLoading(true);
    setError("");
    try {
      const url =
        cat && cat !== "All"
          ? `${API_BASE}?category=${encodeURIComponent(cat)}`
          : API_BASE;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch bills");
      const data = await res.json();

      // Fallback: client-side filter if backend doesn’t filter
      const filtered =
        cat && cat !== "All" ? data.filter((b) => b.category === cat) : data;

      setBills(filtered);
    } catch (e) {
      setError(e.message || "Something went wrong");
      toast.error("Error fetching bills. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills(category);
  }, [category]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const next = new URLSearchParams(searchParams);
    if (value === "All") {
      next.delete("category");
    } else {
      next.set("category", value);
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
      {/* Header + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          All Bills
        </h1>

        <div className="flex items-center gap-3 justify-center md:justify-end">
          <label className="font-medium">Filter by Category:</label>
          <select
            className="select select-bordered w-48"
            value={category}
            onChange={handleCategoryChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <PuffLoader size={60} />
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div className="text-center text-error font-medium">{error}</div>
      )}

      {/* Empty State */}
      {!loading && !error && bills.length === 0 && (
        <div className="text-center text-gray-500">No bills found.</div>
      )}

      {/* Grid Layout */}
      {!loading && !error && bills.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition rounded-xl"
            >
              <figure className="px-4 pt-4">
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="rounded-xl w-full h-48 object-cover"
                />
              </figure>

              <div className="card-body text-center">
                {/* Centered Title */}
                <h2 className="card-title justify-center text-lg font-semibold">
                  {bill.title}
                </h2>

                <p className="text-sm">
                  <span className="font-medium">Category:</span> {bill.category}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Location:</span>{" "}
                  {bill.location}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Amount:</span> ৳{bill.amount}
                </p>

                <div className="card-actions mt-3 justify-center">
                  <Link
                    to={`/bills/${bill._id}`}
                    className="btn btn-primary w-full"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bills;
