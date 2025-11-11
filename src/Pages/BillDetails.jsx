import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import useDocumentTitle from "../Hook/useDocumentTitle";

const API_BASE = "https://b12-a10-utility-bill-management-ser.vercel.app/bills";

const BillDetails = () => {
  useDocumentTitle("Bill Details → Utility Bill Management");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // auto scroll to top of this page

  const { currentUser } = useContext(AuthContext);
  const email= currentUser.email;
  const { id } = useParams();
  // console.log ('params-data', id, email);
  const navigate = useNavigate();
  

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payModal, setPayModal] = useState(false);
  const [form, setForm] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
    info: "",
  });

  // Fetch the bill
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch bill details");
        const data = await res.json();
        setBill(data);
      } catch (err) {
        toast.error(err.message || "Error loading bill details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (payModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [payModal]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <PuffLoader size={60} />
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-error">
        Bill not found.
      </div>
    );
  }

  // Enable Pay only for current month bills
  const billDate = new Date(bill.date);
  const now = new Date();
  const isCurrentMonth =
    billDate.getMonth() === now.getMonth() &&
    billDate.getFullYear() === now.getFullYear();

  const openPay = () => {
    if (!currentUser) {
      toast.warn("Please login first to pay bills!");
      navigate("/login", { state: { from: `/bills/${id}` } });
      return;
    }
    setPayModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const payData = {
      billsId: id,
      username: form.username,
      address: form.address,
      phone: form.phone,
      email: email,
      amount: bill.amount,
      date: new Date().toISOString().slice(0, 10),
      info: form.info || "",
    };

    try {
      const idToken = await currentUser.getIdToken();
      const res = await fetch(
        "https://b12-a10-utility-bill-management-ser.vercel.app/mybills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(payData),
        }
      );
      if (!res.ok) throw new Error("Failed to pay bill, Recheck your given information!");
      toast.success("Bill paid successfully!");
      console.log('post data detail', payData);
      setPayModal(false);
      navigate("/mybills");  // auto navigate to /mybills
    } catch (err) {
      toast.error(err.message || "Payment failed");
    }
  };

  return (
    <div
      className="
        max-w-4xl mx-auto p-6 mt-28
        bg-gradient-to-br from-[#e3f2fd] via-white to-[#f1f8e9]
        dark:from-[#0b1220] dark:via-[#0f1526] dark:to-[#0b1220]
        rounded-2xl shadow-lg relative overflow-hidden
      "
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl bg-[#4285f4]/20" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl bg-[#34a853]/20" />

      <div className="relative z-10">
        <h1
          className="
            text-3xl md:text-4xl font-extrabold mb-6
            bg-clip-text text-transparent bg-gradient-to-r
            from-[#1a73e8] via-[#34a853] to-[#ea4335]
          "
        >
          Bill Details
        </h1>

        <div className="card bg-base-100 shadow-xl border rounded-xl overflow-hidden">
          <figure>
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full h-64 object-cover"
            />
          </figure>
          <div className="card-body space-y-2">
            <h2 className="card-title text-2xl">{bill.title}</h2>
            <p>
              <span className="font-semibold">Category:</span> {bill.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {bill.location}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {bill.description}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(bill.date).toLocaleDateString()}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Amount:</span> ৳{bill.amount}
            </p>

            <div className="mt-4">
              <button
                onClick={openPay}
                disabled={!isCurrentMonth}
                className={`btn w-full font-semibold text-white border-none ${
                  isCurrentMonth
                    ? "bg-[#1a73e8] hover:bg-[#185abc]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isCurrentMonth
                  ? "Pay Bill"
                  : "Only current month bills can be paid"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Bill Modal (scrollable) */}
      {payModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-blue-500">
          <div
            className="
              bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl
              max-h-[90vh] overflow-y-auto relative
            "
          >
            {/* Sticky header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a73e8]">Pay Bill</h2>
              <button
                onClick={() => setPayModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="space-y-3 p-6">
              <div>
                <label className="font-medium">Email <span className="text-xs">(Read-only)</span></label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-medium">Bill ID <span className="text-xs">(Read-only)</span></label>
                <input
                  type="text"
                  value={id}
                  readOnly
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-medium">Amount <span className="text-xs">(Read-only)</span> </label>
                <input
                  type="number"
                  value={bill.amount}
                  readOnly
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-medium">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                  className="input input-bordered w-full mt-1"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="font-medium">Address</label>
                <input
                  name="address"
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  className="input input-bordered w-full mt-1"
                  placeholder="Your address"
                />
              </div>

              <div>
                <label className="font-medium">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="input input-bordered w-full mt-1"
                  placeholder="01XXXXXXXXX" 
                />
                {/* Info Text */}
          <p className="text-xs text-orange-600 italic mt-2">
          ⚠️ Phone number must be exactly 11 digits! </p>
              </div>

              <div>
                <label className="font-medium">Additional Info</label>
                <textarea
                  name="info"
                  rows="2"
                  value={form.info}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, info: e.target.value }))
                  }
                  className="textarea textarea-bordered w-full mt-1"
                  placeholder="Optional note"
                />
              </div>

              <div className="flex justify-between mt-4 pb-2">
                <button
                  type="button"
                  onClick={() => setPayModal(false)}
                  className="btn bg-gray-300 text-black border-none hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#34a853] text-white border-none hover:bg-[#2c8e46]"
                >
                  Confirm Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
