import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import useDocumentTitle from "../Hook/useDocumentTitle";

const API_BASE = "https://b12-a10-utility-bill-management-ser.vercel.app/bills";

const AddBill = () => {
  useDocumentTitle("Add Bill → Utility Bill Management");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",   
    location: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0],   // <-- auto-set today's date
    amount: "",
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.warn("Please login first to add a bill!");
      navigate("/login", { state: { from: "/add-bill" } });
      return;
    }

    // Basic validation
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!form.location.trim()) {
      toast.error("Location is required.");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Description is required.");
      return;
    }
    if (!form.image.trim()) {
      toast.error("Image URL is required.");
      return;
    }
    if (!form.date) {
      toast.error("Date is required.");
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Amount must be greater than 0.");
      return;
    }
    if (!form.category) {
      toast.error("Category is required.");
      return;
    }

    const newBillData = {
      title: form.title.trim(),
      category: form.category,
      email: currentUser?.email || "",
      location: form.location.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      date: form.date, // yyyy-mm-dd from input[type="date"]
      amount: Number(form.amount),
    };

    try {
      setLoading(true);
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBillData),
      });

      if (!res.ok) {
        throw new Error("Failed to add bill. Please check your inputs.");
      }

      toast.success("Bill added successfully!");
      setForm({
        title: "",
        category: "",  
        location: "",
        description: "",
        image: "",
        date: new Date().toISOString().split("T")[0],  
        amount: "",
      });
      navigate("/bills");
    } catch (err) {
      toast.error(err?.message || "Something went wrong while adding the bill.");
    } finally {
      setLoading(false);
    }
  };

  // If not logged in, show a friendly message (extra safety if route is not protected)
  if (!currentUser) {
    return (
      <div
        className="mt-24 min-h-screen flex items-center justify-center px-4 py-10
        bg-gradient-to-br from-[#e3f2fd] via-white to-[#f1f8e9]"
      >
        <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-3xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Login Required</h2>
          <p className="mb-4">
            Please log in to add a new utility bill to the system.
          </p>
          <button
            onClick={() =>
              navigate("/login", { state: { from: "/addbill" } })
            }
            className="btn bg-[#1a73e8] hover:bg-[#185abc] border-none text-white w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        mt-24 min-h-screen flex items-center justify-center
        px-4 py-10 relative overflow-hidden
        bg-gradient-to-br from-[#e3f2fd] via-white to-[#f1f8e9]
      "
    >
      {/* decorative blobs like Login page */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[#34a853]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[#4285f4]" />
      <div className="pointer-events-none absolute top-1/3 -left-10 w-44 h-44 rounded-full blur-2xl opacity-20 bg-[#fbbc05]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-10 w-44 h-44 rounded-full blur-2xl opacity-20 bg-[#ea4335]" />

      <div
        className="
          w-full max-w-3xl
          card shadow-xl border border-base-200/60
          rounded-3xl overflow-hidden backdrop-blur
          bg-base-100/90
        "
      >
        {/* colorful top-bar */}
        <div className="h-1.5 w-full flex">
          <span className="flex-1 bg-[#4285f4]" />
          <span className="flex-1 bg-[#34a853]" />
          <span className="flex-1 bg-[#fbbc05]" />
          <span className="flex-1 bg-[#ea4335]" />
        </div>

        <div className="card-body">
          <h1
            className="
              text-3xl md:text-4xl font-extrabold text-center
              tracking-tight leading-tight
              bg-clip-text text-transparent
              bg-gradient-to-r from-[#1a73e8] via-[#34a853] to-[#ea4335]
            "
          >
            Add New Bill
          </h1>
          <p className="text-center text-base-content/60 mt-1">
            Fill in the details to create a new utility bill
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Title */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                type="text"
                placeholder="Bill Title"
                className="input input-bordered w-full"
                value={form.title}
                onChange={handleChange("title")}
                required
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={form.category}
                onChange={handleChange("category")}
                required
              >
                <option value="">Select Category</option>
                <option value="Electricity">Electricity</option>
                <option value="Gas">Gas</option>
                <option value="Water">Water</option>
                <option value="Internet">Internet</option>
              </select>
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Bill Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={form.date}
                onChange={handleChange("date")}
                required
              />
            </div>

            {/* Location */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
                value={form.location}
                onChange={handleChange("location")}
                required
              />
            </div>

            {/* Image URL */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Image URL</span>
              </label>
              <input
                type="url"
                placeholder="https://i.ibb.co.com/your-image.jpg"
                className="input input-bordered w-full"
                value={form.image}
                onChange={handleChange("image")}
                required
              />
            </div>

            {/* Amount */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Amount (৳)</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="2600"
                className="input input-bordered w-full"
                value={form.amount}
                onChange={handleChange("amount")}
                required
              />
            </div>

            {/* Email (read only from logged-in user) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Email (auto-filled)
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={currentUser?.email || ""}
                readOnly
              />
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                rows="3"
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={form.description}
                onChange={handleChange("description")}
                required
              />
            </div>

            {/* Submit button */}
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="
                  btn w-full font-semibold
                  bg-[#1a73e8] hover:bg-[#185abc] text-white border-none
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2
                  focus-visible:ring-[#1a73e8] focus-visible:ring-offset-base-100
                "
                disabled={loading}
              >
                {loading ? <PuffLoader size={20} /> : "Add Bill"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBill;
