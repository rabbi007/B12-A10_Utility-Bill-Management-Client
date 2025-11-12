import { useEffect, useState, useContext } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { Link } from "react-router";
import useDocumentTitle from "../Hook/useDocumentTitle";

const MyBills = () => {
  useDocumentTitle("My Paid Bills → Utility Bill Management");
  // auto scroll to top of this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [summary, setSummary] = useState({ total: 0, count: 0 });

  const API_BASE =
    "https://b12-a10-utility-bill-management-ser.vercel.app/mybills";

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
      // const res = await fetch(`${API_BASE}?email=${currentUser?.email || currentUser?.uid}`,
      const res = await fetch(
        `${API_BASE}?email=${currentUser?.email}&uid=${currentUser?.uid}`,
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${currentUser.accessToken}`
          },
        }
      );
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
  }, [currentUser]);

  // Delete a record
  const handleDelete = async (id) => {
    console.log("handle id:", id);

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
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${currentUser.accessToken}`
        },
      });
      const result = await res.json();
      // console.log ('result', result)
      if (result.deletedCount) {
        toast.success("Bill deleted successfully!");
        fetchMyBills();
      } else {
        toast.error("Delete failed!");
      }
    } catch (err) {
      toast.error("Error deleting bill", err);
      console.log("Error deleting bill", err);
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
      const res = await fetch(`${API_BASE}/${editData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify({
          amount: editData.amount,
          address: editData.address,
          phone: editData.phone,
          date: editData.date,
        }),
      });
      const result = await res.json();
      console.log("patch result", result);
      if (result.modifiedCount) {
        toast.success("Bill updated successfully!");
        setEditModal(false);
        fetchMyBills();
      } else toast.error("Update failed!");
    } catch (err) {
      toast.error("Error updating bill", err);
    }
  };


const downloadReport = () => {
  const doc = new jsPDF();

  // Add page heading/title to the PDF
  const title = `${currentUser?.displayName}'s Paid Bills Report`;
  const subtitle = `Email-ID / User-ID: ${currentUser?.email || currentUser?.uid}`;

  // Set font for title and subtitle
  doc.setFontSize(16);
  doc.text(title, 14, 20); // Position (x, y)
  doc.setTextColor(0, 0, 255);  // Title Text Color: Blue
  
  doc.setFontSize(12);
  doc.text(subtitle, 14, 30); // Position (x, y)
  doc.setTextColor(0, 128, 0);  // Subtitle Text Color: Dark Green
  
  // Add extra space before the table starts
  doc.setFont("helvetica", "normal");

  // Table Format
  const head = [
    ["Username", "Email-ID", "User-ID", "Amount", "Address", "Phone", "Date"],
  ];
  const body = bills.map((b) => [
    b.username,
    b.email,
    b.userUid,
    b.amount,
    b.address,
    b.phone,
    b.date,
  ]);

  // Insert the table into the PDF document
  autoTable(doc, {
    head: head,
    body: body,
    startY: 40, // Start the table 40 units below the title
    theme: "grid", // Optional: to use a grid theme for the table
    styles: {
      fontSize: 10,
      textColor: [0, 0, 0], // Black text for better contrast
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [240, 240, 240], // Light gray for headers
      textColor: [50, 50, 50], // Darker color for header text
      fontStyle: 'bold',
    },
    bodyStyles: {
      valign: 'middle', // Vertical alignment in the cells
    },

    alternateRowStyles: {
      fillColor: [255, 235, 238], // Light Red background for alternate rows (optional)
       },

    margin: { top: 14, bottom: 20, left: 10, right: 10 }, // Margin adjustments for better spacing
  });

  // Save the generated PDF file
  doc.save(`My_Bills_${currentUser?.displayName}.pdf`);
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
      className="mt-28 max-w-6xl mx-auto px-4 py-8 
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
          My Paid Bills
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
                  <th>Email-ID</th>
                  <th>User-ID</th>
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
                    <td>{b.userUid}</td>
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
                  type="number"
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
