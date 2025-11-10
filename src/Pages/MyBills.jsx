import { useEffect, useState, useContext } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { Link } from "react-router";

const API_BASE =
  "https://b12-a10-utility-bill-management-ser.vercel.app/mybills";

const MyBills = () => {
  const { currentUser } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [summary, setSummary] = useState({ total: 0, count: 0 });

  // Fetch current user's bills
  const fetchMyBills = async () => {
    if (!currentUser) {
      setBills([]);
      setSummary({ total: 0, count: 0 });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const idToken = await currentUser.getIdToken();
      const res = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid data response");

      const totalAmount = data.reduce(
        (sum, b) => sum + (Number(b.amount) || 0),
        0
      );
      setSummary({ total: totalAmount, count: data.length });
      setBills(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bills!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Delete a record
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This bill record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.deleted) {
        toast.success("Bill deleted successfully!");
        fetchMyBills();
      } else {
        toast.error("Delete failed!");
      }
    } catch (err) {
      toast.error("Error deleting bill.", err);
    }
  };

  // Open edit modal
  const openEditModal = (bill) => {
    setEditData({ ...bill });
    setEditModal(true);
  };

  // Save updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${API_BASE}/${editData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: editData.amount,
          address: editData.address,
          phone: editData.phone,
          date: editData.date,
        }),
      });
      const result = await res.json();
      if (result.modifiedCount) {
        toast.success("Bill updated successfully!");
        setEditModal(false);
        fetchMyBills();
      } else toast.error("Update failed!");
    } catch (err) {
      toast.error("Error updating bill", err);
    }
  };

  //  PDF download
  const downloadReport = () => {
    const doc = new jsPDF();

    // Table Format
    const head = [["Username", "Email", "Amount", "Address", "Phone", "Date"]];
    const body = bills.map((b) => [
      b.username,
      b.email,
      b.amount,
      b.address,
      b.phone,
      b.date,
    ]);

    autoTable(doc, {
      head,
      body,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [240, 240, 240] },
      margin: { top: 14 },
    });

    doc.save("my-bills.pdf");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <PuffLoader size={60} color="#1a73e8" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center mt-24">
        <div className="max-w-full">
          <h2 className="text-2xl font-bold mb-2">Please log in</h2>
          <p className="text-gray-600 font-medium ">
            You need to be login to view and manage your paid bills.
          </p>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-primary font-medium underline-offset-4"
            >
              Login
            </Link>{" "}
            here
          </p>

           <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="link link-primary font-medium underline-offset-4"
            >
              Register
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-24 max-w-6xl mx-auto px-4 py-8 
        bg-gradient-to-br from-[#fefefe] via-[#f8f9fa] to-[#e8f5e9]
        dark:from-[#0b1220] dark:via-[#0f1526] dark:to-[#0b1220]
        rounded-2xl shadow-lg relative
        text-gray-900 dark:text-gray-100
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
          My Pay Bills
        </h1>

        {/* Summary */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
          <div className="text-lg font-semibold">
            Total Bills: {summary.count} &nbsp; & &nbsp; Total Amount:{" "}
            <span className="text-[#1a73e8] font-bold">৳{summary.total}</span>
          </div>
          <button
            onClick={downloadReport}
            className="btn bg-[#1a73e8] hover:bg-[#185abc] text-white border-none"
            disabled={bills.length === 0}
          >
            Download Report (PDF)
          </button>
        </div>

        {/* Table */}
        {bills.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No paid bills found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
            <table className="table w-full">
              <thead className="bg-[#4285f4] text-white text-sm">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-200">
                {bills.map((b, i) => (
                  <tr
                    key={b._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td>{i + 1}</td>
                    <td>{b.username}</td>
                    <td>{b.email}</td>
                    <td>৳{b.amount}</td>
                    <td>{b.address}</td>
                    <td>{b.phone}</td>
                    <td>{b.date}</td>
                    <td className="flex gap-2 flex-wrap">
                      <button
                        className="btn btn-xs bg-[#34a853] hover:bg-[#2c8e46] text-white border-none"
                        onClick={() => openEditModal(b)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs bg-[#ea4335] hover:bg-[#c5221f] text-white border-none"
                        onClick={() => handleDelete(b._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal (scrollable) */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto relative text-gray-900 dark:text-gray-100">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1a73e8]">Update Bill</h2>
              <button
                onClick={() => setEditModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3 p-6">
              <div>
                <label className="font-medium">Amount</label>
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Phone</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Date</label>
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>

              <div className="flex justify-between mt-4 pb-2">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="btn bg-gray-300 text-black border-none hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#34a853] text-white border-none hover:bg-[#2c8e46]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBills;
