import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Firebase/Firebase";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.trim();
    const password = form.get("password");

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg =
        err?.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : err?.message || "Login failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!", { position: "top-center" });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed", { position: "top-center" });
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

      <div
        className="
          w-full max-w-md
          card shadow-xl border border-base-200/60
          rounded-3xl overflow-hidden backdrop-blur
          bg-base-100/90
        "
      >
        {/* colorful top-bar inspired by Google colors */}
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
            <FiLogIn className="text-base-content/80" />
            Login
          </h1>
          <p className="text-center text-base-content/60 mt-1">
            Welcome back — sign in to continue
          </p>

          <form onSubmit={handleEmailLogin} className="space-y-4 mt-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="
                  input input-bordered w-full
                  focus:outline-none focus-visible:ring focus-visible:ring-offset-2
                  focus-visible:ring-[#1a73e8] focus-visible:ring-offset-base-100
                "
                placeholder="you@example.com"
                required
                aria-label="Email address"
                autoComplete="email"
              />
            </div>

            <div className="form-control">
              <label className="label justify-between">
                <span className="label-text font-medium">Password</span>
                <Link
                  to="/login"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </Link>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="
                    input input-bordered w-full pr-12
                    focus:outline-none focus-visible:ring focus-visible:ring-offset-2
                    focus-visible:ring-[#34a853] focus-visible:ring-offset-base-100
                  "
                  placeholder="••••••"
                  required
                  minLength={6}
                  aria-label="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="
                    btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2
                    rounded-full
                  "
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

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
              {loading ? <PuffLoader size={20} /> : "Login"}
            </button>
          </form>

          <div className="divider">or</div>

          <button
            onClick={handleGoogleLogin}
            className="
              btn w-full font-medium bg-base-100 text-base-content border-base-300
              hover:border-transparent hover:shadow
              focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2
              focus-visible:ring-[#ea4335] focus-visible:ring-offset-base-100
            "
            disabled={loading}
            aria-label="Continue with Google"
          >
            <span className="flex items-center gap-2">
              <FcGoogle className="text-xl" /> Continue with Google
            </span>
          </button>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="link link-primary font-medium underline-offset-4"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
