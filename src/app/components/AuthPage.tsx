import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, MapPin, Compass, ArrowLeft, CheckCircle } from "lucide-react";
import { useUser } from "../data/userStore";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type AuthMode = "login" | "signup";

export function AuthPage() {
  const { signup, login } = useUser();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = mode === "signup" ? signup(email, password) : login(email, password);
      if (!result.success) {
        setError(result.error || "Something went wrong");
      } else {
        navigate("/", { replace: true });
      }
      setLoading(false);
    }, 600);
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setConfirmPassword("");
  };

  const handleResetPassword = () => {
    setResetError("");
    if (!resetEmail.trim()) {
      setResetError("Please enter your email");
      return;
    }
    if (!isValidEmail(resetEmail)) {
      setResetError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResetSent(true);
      setLoading(false);
    }, 800);
  };

  const exitForgotPassword = () => {
    setForgotPassword(false);
    setResetEmail("");
    setResetSent(false);
    setResetError("");
  };

  // Forgot password flow
  if (forgotPassword) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Hero gradient section */}
        <div
          className="relative h-[220px] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          <div className="absolute top-7 left-0 right-0 flex flex-col items-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
              }}
            >
              <Compass size={28} className="text-white" />
            </div>
            <h1 className="font-['Poppins'] text-[24px] font-semibold text-white">
              CityUnlock
            </h1>
            <p className="font-['Poppins'] text-[13px] text-white/80 mt-0.5">
              Creator-led trail experiences
            </p>
          </div>
        </div>

        <div className="flex-1 px-6 -mt-6 relative z-10">
          {/* Back button */}
          <button
            onClick={exitForgotPassword}
            className="flex items-center gap-1.5 mb-6 text-[14px] font-['Poppins'] font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Login
          </button>

          {!resetSent ? (
            <>
              <h2 className="font-['Poppins'] text-[22px] font-semibold text-gray-900 mb-1">
                Reset your password
              </h2>
              <p className="font-['Poppins'] text-[14px] text-gray-500 mb-6">
                Enter your email and we'll send you a link to reset your password
              </p>

              {resetError && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="font-['Poppins'] text-[13px] text-red-600">{resetError}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                  />
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                style={{
                  backgroundImage:
                    "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center pt-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="font-['Poppins'] text-[22px] font-semibold text-gray-900 mb-2">
                Check your inbox
              </h2>
              <p className="font-['Poppins'] text-[14px] text-gray-500 mb-2 max-w-[280px]">
                We've sent a password reset link to
              </p>
              <p className="font-['Poppins'] text-[14px] font-semibold text-gray-800 mb-6">
                {resetEmail}
              </p>
              <p className="font-['Poppins'] text-[13px] text-gray-400 mb-8">
                Didn't receive it? Check your spam folder or{" "}
                <button
                  onClick={() => { setResetSent(false); }}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  try again
                </button>
              </p>
              <button
                onClick={exitForgotPassword}
                className="w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  backgroundImage:
                    "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                }}
              >
                Back to Login
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero gradient section */}
      <div
        className="relative h-[220px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

        {/* Logo overlay */}
        <div className="absolute top-7 left-0 right-0 flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
            }}
          >
            <Compass size={28} className="text-white" />
          </div>
          <h1 className="font-['Poppins'] text-[24px] font-semibold text-white">
            CityUnlock
          </h1>
          <p className="font-['Poppins'] text-[13px] text-white/80 mt-0.5">
            Creator-led trail experiences
          </p>
        </div>
      </div>

      {/* Auth form */}
      <div className="flex-1 px-6 -mt-6 relative z-10">
        {/* Mode tabs */}
        <div className="flex gap-1 mb-6 bg-[#ECEDF2] rounded-full p-1.5">
          <button
            onClick={() => { setMode("login"); setError(""); setConfirmPassword(""); }}
            className={`flex-1 py-2.5 rounded-full text-[14px] font-['Poppins'] font-medium transition-all ${
              mode === "login"
                ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                : "text-gray-500"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-2.5 rounded-full text-[14px] font-['Poppins'] font-medium transition-all ${
              mode === "signup"
                ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Heading */}
        <h2 className="font-['Poppins'] text-[22px] font-semibold text-gray-900 mb-1">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="font-['Poppins'] text-[14px] text-gray-500 mb-6">
          {mode === "login"
            ? "Sign in to continue your trail adventures"
            : "Join the community and start exploring"}
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
            <p className="font-['Poppins'] text-[13px] text-red-600">{error}</p>
          </div>
        )}

        {/* Form fields */}
        <div className="space-y-4 mb-6">
          {/* Email */}
          <div>
            <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "Min 6 characters" : "Enter your password"}
                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm password (signup only) */}
          {mode === "signup" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>
          )}
        </div>

        {/* Forgot password (login only) */}
        {mode === "login" && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => { setForgotPassword(true); setResetEmail(email); setError(""); }}
              className="text-[13px] font-['Poppins'] font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {mode === "login" ? "Log In" : "Create Account"}
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[12px] font-['Poppins'] text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social login buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                login("google-user@gmail.com", "google123");
                navigate("/", { replace: true });
                setLoading(false);
              }, 600);
            }}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            <span className="text-[13px] font-['Poppins'] font-medium text-gray-700">Google</span>
          </button>
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                login("apple-user@icloud.com", "apple123");
                navigate("/", { replace: true });
                setLoading(false);
              }, 600);
            }}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.71 14.13c-.66.97-1.38 1.93-2.45 1.95-1.07.02-1.42-.64-2.64-.64-1.23 0-1.61.62-2.63.66-1.05.04-1.86-1.05-2.53-2.01C2.1 12.11 1.12 8.63 2.53 6.28A4.14 4.14 0 0 1 6.02 4.1c1.03-.02 2 .7 2.63.7.63 0 1.81-.86 3.06-.74.52.02 1.98.21 2.92 1.59-.08.05-1.74 1.02-1.73 3.04.02 2.41 2.12 3.21 2.14 3.22-.02.06-.33 1.15-1.33 2.22ZM10.8 2.46c.55-.67.92-1.6.82-2.53-.79.03-1.75.53-2.32 1.19-.5.58-.95 1.53-.83 2.43.88.07 1.78-.45 2.33-1.09Z" fill="#000"/>
            </svg>
            <span className="text-[13px] font-['Poppins'] font-medium text-gray-700">Apple</span>
          </button>
        </div>

        {/* Switch mode */}
        <p className="text-center font-['Poppins'] text-[14px] text-gray-500 pb-8">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={switchMode}
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}