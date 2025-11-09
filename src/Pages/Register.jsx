import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import { FiUserPlus, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasLen = pwd?.length >= 6;
    if (!hasUpper) return "Password must include at least one uppercase letter.";
    if (!hasLower) return "Password must include at least one lowercase letter.";
    if (!hasLen) return "Password length must be at least 6 characters.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.trim();
    const photoURL = form.get("photo")?.trim();
    const email = form.get("email")?.trim();
    const password = form.get("password");

    if (!name || !email || !password) {
      toast.error("Please fill all required fields.");
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      toast.error(pwdError);
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name & photo
      await updateProfile(cred.user, {
        displayName: name,
        photoURL: photoURL || undefined,
      });

      toast.success("Registration successful!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg =
        err?.code === "auth/email-already-in-use"
          ? "Email already in use."
          : err?.message || "Registration failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        px-4 py-10 relative overflow-hidden
        bg-gradient-to-br from-[#e3f2fd] via-white to-[#f1f8e9]
        dark:from-[#0b1220] dark:via-[#0f1526] dark:to-[#0b1220]
      "
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[#34a853]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[#4285f4]" />
      <div className="pointer-events-none absolute top-1/3 -left-10 w-44 h-44 rounded-full blur-2xl opacity-20 bg-[#fbbc05]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-10 w-44 h-44 rounded-full blur-2xl opacity-20 bg-[#ea4335]" />

      <div className="w-full max-w-md card shadow-xl border border-base-200/60 rounded-3xl overflow-hidden backdrop-blur bg-base-100/90">
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
              flex items-center gap-2 justify-center
            "
          >
            <FiUserPlus className="text-base-content/80" />
            Register
          </h1>
          <p className="text-center text-base-content/60 mt-1">
            Create your account to get started
          </p>

          <form onSubmit={handleRegister} className="space-y-4 mt-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Your full name"
                required
                aria-label="Full name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                name="photo"
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
                aria-label="Photo URL"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                required
                aria-label="Email address"
                autoComplete="email"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="input input-bordered w-full pr-12"
                  placeholder="••••••"
                  required
                  minLength={6}
                  aria-label="Password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="text-xs text-base-content/60 mt-1">
                Must include: 1 uppercase, 1 lowercase, and 6+ characters.
              </p>
            </div>

            <button
              type="submit"
              className="btn w-full font-semibold bg-[#1a73e8] hover:bg-[#185abc] text-white border-none"
              disabled={loading}
            >
              {loading ? <PuffLoader size={20} /> : "Create Account"}
            </button>
          </form>

          <div className="divider">or</div>

          <button
            onClick={handleGoogleRegister}
            className="btn w-full font-medium bg-base-100 text-base-content border-base-300 hover:border-transparent hover:shadow"
            disabled={loading}
            aria-label="Continue with Google"
          >
            <span className="flex items-center gap-2">
              <FcGoogle className="text-xl" /> Continue with Google
            </span>
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
