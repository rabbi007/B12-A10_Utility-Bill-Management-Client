import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FiUser, FiLogOut, FiSave } from "react-icons/fi";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Contexts/AuthContext/AuthContext"; // adjust if your path differs

const Profile = () => {
  const { currentUser, loading, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  }, [loading, currentUser, navigate, location.pathname]);

  const initial = useMemo(
    () => ({
      name: currentUser?.displayName || "",
      photo: currentUser?.photoURL || "",
    }),
    [currentUser]
  );

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => setForm(initial), [initial]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setSaving(true);
      await updateProfile(currentUser, {
        displayName: form.name || null,
        photoURL: form.photo || null,
      });
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await signOutUser();
      toast.success("Logged out.");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Logout failed.");
    } finally {
      setSigningOut(false);
    }
  };

  // Loading state
  if (loading || (!currentUser && !loading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <PuffLoader size={60} />
      </div>
    );
  }

  return (
    <div
      className="mt-24
        min-h-screen px-4 py-10 relative overflow-hidden
        bg-gradient-to-br from-[#e3f2fd] via-white to-[#f1f8e9]
        dark:from-[#0b1220] dark:via-[#0f1526] dark:to-[#0b1220]
      "
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[#34a853]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[#4285f4]" />
      <div className="pointer-events-none absolute top-1/3 -left-10 w-44 h-44 rounded-full blur-2xl opacity-20 bg-[#fbbc05]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-10 w-44 h-44 rounded-full blur-2xl opacity-20 bg-[#ea4335]" />

      <div className="max-w-3xl mx-auto">
        <div className="card shadow-xl border border-base-200/60 rounded-3xl overflow-hidden bg-base-100/90 backdrop-blur">
          {/* Google color bar */}
          <div className="h-1.5 w-full flex">
            <span className="flex-1 bg-[#4285f4]" />
            <span className="flex-1 bg-[#34a853]" />
            <span className="flex-1 bg-[#fbbc05]" />
            <span className="flex-1 bg-[#ea4335]" />
          </div>

          <div className="card-body">
            <div className="flex items-center justify-between gap-3">
              <h1
                className="
                  text-3xl md:text-4xl font-extrabold tracking-tight leading-tight
                  bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#34a853] to-[#ea4335]
                  flex items-center gap-2
                "
              >
                <FiUser /> Profile
              </h1>

              <button
                onClick={handleLogout}
                className="btn btn-ghost"
                disabled={signingOut}
              >
                <FiLogOut /> {signingOut ? "Logging out..." : "Logout"}
              </button>
            </div>

            {/* Top summary */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={
                  form.photo ||
                  "https://i.ibb.co/4V9V8Gx/placeholder-avatar.png"
                }
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border"
              />
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold">{form.name || "Unnamed User"}</h2>
                <p className="text-base-content/70">{currentUser?.email}</p>
                <div className="text-sm text-base-content/60">
                  <span className="mr-3">UID: {currentUser?.uid?.slice(0, 8)}…</span>
                  <span>
                    Provider: {currentUser?.providerData?.[0]?.providerId || "password"}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit form */}
            <form onSubmit={handleUpdate} className="mt-8 grid grid-cols-1 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Display Name</span></label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered"
                  placeholder="Your name"
                  value={form.name}
                  onChange={onChange}
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Photo URL</span></label>
                <input
                  name="photo"
                  type="url"
                  className="input input-bordered"
                  placeholder="https://example.com/photo.jpg"
                  value={form.photo}
                  onChange={onChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Email</span></label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={currentUser?.email || ""}
                    disabled
                    readOnly
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">User ID</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={currentUser?.uid || ""}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn mt-2 bg-[#1a73e8] hover:bg-[#185abc] text-white border-none font-semibold"
                disabled={saving}
              >
                <FiSave /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>

            <div className="mt-4">
              <Link to="/" className="link link-primary">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
