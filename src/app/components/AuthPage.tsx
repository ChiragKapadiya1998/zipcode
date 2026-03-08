import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Compass,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  XCircle,
  Loader2,
  Instagram,
  Users,
  Image as ImageIcon,
  TrendingUp,
  Sparkles,
  Check,
  ChevronRight,
  Coffee,
  Palette,
  Camera,
  Music,
  ShoppingBag,
  Dumbbell,
  UtensilsCrossed,
  Bike,
  MapPin,
} from "lucide-react";
import { useUser } from "../data/userStore";
import { useNavigate } from "react-router";
import { CityUnlockLogo } from "./CityUnlockLogo";
import {
  fetchInstagramProfile,
  formatCount,
  type InstagramProfile,
} from "../data/instagramService";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type AuthMode = "login" | "signup";
type AuthStep = "auth" | "otp" | "interests";

const interestOptions = [
  { label: "Food & Drink", icon: UtensilsCrossed, color: "#FF6900" },
  { label: "Art & Culture", icon: Palette, color: "#8B5CF6" },
  { label: "Photography", icon: Camera, color: "#EC4899" },
  { label: "Music & Live", icon: Music, color: "#EF4444" },
  { label: "Shopping", icon: ShoppingBag, color: "#F59E0B" },
  { label: "Sports & Fitness", icon: Dumbbell, color: "#155DFC" },
  { label: "Coffee & Cafes", icon: Coffee, color: "#92400E" },
  { label: "Cycling & Rides", icon: Bike, color: "#10B981" },
];

const CTA_GRADIENT =
  "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)";
const GLASS_BG =
  "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)";

/** Desktop split-screen wrapper — reused by every return branch */
function AuthDesktopShell({
  children,
  stepLabel,
}: {
  children: React.ReactNode;
  stepLabel: string;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* ═══ DESKTOP LEFT BRANDING PANEL ═══ */}
      <div
        className="hidden lg:flex lg:w-[44%] lg:min-h-screen lg:sticky lg:top-0 lg:flex-col lg:items-center lg:justify-center lg:px-10 lg:py-16 lg:relative lg:overflow-hidden"
        style={{ backgroundImage: CTA_GRADIENT }}
      >
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1682537531866-40d3aaca9b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwZXhwbG9yaW5nJTIwdXJiYW4lMjBjaXR5JTIwdHJhaWwlMjB3YWxraW5nfGVufDF8fHx8MTc3MjUyNDAxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-400/20 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[340px]">
          {/* Logo */}
          <CityUnlockLogo layout="stacked" size={52} variant="onGradient" />

          {/* Tagline */}
          <p className="font-['Poppins'] text-[15px] text-white/70 mt-3 leading-relaxed max-w-[280px]">
            Discover creator-led trail experiences in your city
          </p>

          {/* Divider line */}
          <div className="w-12 h-px bg-white/20 mt-8 mb-8" />

          {/* Feature highlights */}
          <div className="flex flex-col gap-3 w-full">
            {[
              { icon: Compass, text: "Resume your trail adventures" },
              { icon: MapPin, text: "Discover new creator-led experiences" },
              { icon: Sparkles, text: "Track your points & badges" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <f.icon size={17} className="text-white" />
                </div>
                <span className="font-['Poppins'] text-[13px] text-white/90 text-left leading-snug">
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* Step pill */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5 border border-white/10">
            <span className="font-['Poppins'] text-[12px] text-white/70 tracking-wide uppercase">
              {stepLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT AREA ═══ */}
      <div className="flex-1 flex flex-col lg:overflow-y-auto lg:justify-center">
        {children}
      </div>
    </div>
  );
}

export function AuthPage() {
  const { signup, login, updateUser } = useUser();
  const navigate = useNavigate();

  // Multi-step state
  const [authStep, setAuthStep] = useState<AuthStep>("auth");

  // Auth form
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");

  // OTP
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Interests + Instagram
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [instagramHandle, setInstagramHandle] = useState("");
  const [igLoading, setIgLoading] = useState(false);
  const [igProfile, setIgProfile] = useState<InstagramProfile | null>(null);
  const [igError, setIgError] = useState("");
  const [igFetched, setIgFetched] = useState(false);
  const lastFetchedIg = useRef("");

  // OTP resend timer
  useEffect(() => {
    if (authStep !== "otp") return;
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer, authStep]);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // ── Auth submit ──
  const handleSubmit = () => {
    setError("");
    if (!email.trim()) { setError("Please enter your email"); return; }
    if (!isValidEmail(email)) { setError("Please enter a valid email address"); return; }
    if (!password.trim()) { setError("Please enter your password"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (mode === "signup" && password !== confirmPassword) { setError("Passwords don't match"); return; }

    setLoading(true);
    setTimeout(() => {
      if (mode === "signup") {
        // DON'T call signup() yet — it sets isLoggedIn:true which unmounts AuthPage.
        // Just validate and move to OTP. We'll call signup() after OTP + Interests are done.
        setAuthStep("otp");
        setResendTimer(30);
        setCanResend(false);
        setOtpValues(["", "", "", "", "", ""]);
        setOtpVerified(false);
      } else {
        // Login → call login() and go home immediately
        const result = login(email, password);
        if (!result.success) {
          setError(result.error || "Something went wrong");
        } else {
          navigate("/", { replace: true });
        }
      }
      setLoading(false);
    }, 600);
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setConfirmPassword("");
  };

  // ── Forgot password ──
  const handleResetPassword = () => {
    setResetError("");
    if (!resetEmail.trim()) { setResetError("Please enter your email"); return; }
    if (!isValidEmail(resetEmail)) { setResetError("Please enter a valid email address"); return; }
    setLoading(true);
    setTimeout(() => { setResetSent(true); setLoading(false); }, 800);
  };

  const exitForgotPassword = () => {
    setForgotPassword(false);
    setResetEmail("");
    setResetSent(false);
    setResetError("");
  };

  // ── OTP handlers ──
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);
    setOtpError("");
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.every((v) => v !== "") && newOtp.join("").length === 6) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted.length) return;
    const newOtp = [...otpValues];
    for (let i = 0; i < 6; i++) newOtp[i] = pasted[i] || "";
    setOtpValues(newOtp);
    if (pasted.length === 6) verifyOtp(pasted);
    else otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const verifyOtp = (_code: string) => {
    setOtpVerifying(true);
    setOtpError("");
    setTimeout(() => {
      setOtpVerifying(false);
      setOtpVerified(true);
      updateUser({ emailVerified: true });
      setTimeout(() => setAuthStep("interests"), 800);
    }, 1000);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setResendTimer(30);
    setCanResend(false);
    setOtpValues(["", "", "", "", "", ""]);
    setOtpError("");
    otpRefs.current[0]?.focus();
  };

  // ── Instagram fetch ──
  const igTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateUserRef = useRef(updateUser);
  updateUserRef.current = updateUser;

  const doFetchInstagram = async (username: string) => {
    const clean = username.replace(/^@/, "").trim();
    if (!clean || clean.length < 3 || clean === lastFetchedIg.current) return;
    lastFetchedIg.current = clean;
    setIgLoading(true);
    setIgError("");
    const result = await fetchInstagramProfile(clean);
    if (lastFetchedIg.current !== clean) return; // stale
    if (result.success && result.profile) {
      setIgProfile(result.profile);
      setIgFetched(true);
      updateUserRef.current({ instagramHandle: clean, instagramData: result.profile });
    } else {
      setIgError(result.error || "Could not fetch profile");
      setIgProfile(null);
      setIgFetched(false);
    }
    setIgLoading(false);
  };

  const onInstagramHandleChange = (value: string) => {
    const clean = value.replace(/\s/g, "").replace(/^@/, "");
    setInstagramHandle(clean);
    if (igTimerRef.current) clearTimeout(igTimerRef.current);
    if (!clean || clean.length < 3) {
      setIgProfile(null);
      setIgFetched(false);
      setIgError("");
      setIgLoading(false);
      lastFetchedIg.current = "";
      return;
    }
    if (clean === lastFetchedIg.current) return;
    igTimerRef.current = setTimeout(() => doFetchInstagram(clean), 900);
  };

  // ── Interests toggle ──
  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  // ── Finish interests step ──
  const handleInterestsDone = () => {
    // NOW we actually create the account — this sets isLoggedIn:true
    // which causes Layout to show the main app
    signup(email, password);
    updateUser({
      interests: selectedInterests,
      emailVerified: true,
      ...(igProfile ? { instagramHandle: instagramHandle.replace(/^@/, "").trim(), instagramData: igProfile } : {}),
    });
    navigate("/", { replace: true });
  };

  // ═══════════════════════════════════════════════
  // RENDER: Forgot Password
  // ═══════════════════════════════════════════════
  if (forgotPassword) {
    return (
      <AuthDesktopShell stepLabel="Reset Password">
      <div className="min-h-screen bg-white flex flex-col lg:min-h-0">
        <div
          className="relative h-[220px] overflow-hidden lg:hidden"
          style={{ backgroundImage: CTA_GRADIENT }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          <div className="absolute top-7 left-0 right-0 flex flex-col items-center">
            <CityUnlockLogo layout="stacked" size={44} variant="onGradient" />
            <p className="font-['Poppins'] text-[13px] text-white/80 mt-1.5">Creator-led trail experiences</p>
          </div>
        </div>

        <div className="flex-1 px-6 -mt-6 relative z-10 lg:mt-0 lg:pt-12 lg:max-w-[480px] lg:mx-auto lg:w-full">
          <button onClick={exitForgotPassword} className="flex items-center gap-1.5 mb-6 text-[14px] font-['Poppins'] font-medium text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft size={16} />
            Back to Login
          </button>

          {!resetSent ? (
            <>
              <h2 className="font-['Poppins'] text-[22px] font-semibold text-gray-900 mb-1">Reset your password</h2>
              <p className="font-['Poppins'] text-[14px] text-gray-500 mb-6">Enter your email and we'll send you a link to reset your password</p>
              {resetError && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="font-['Poppins'] text-[13px] text-red-600">{resetError}</p>
                </div>
              )}
              <div className="mb-6">
                <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleResetPassword()} />
                </div>
              </div>
              <button onClick={handleResetPassword} disabled={loading}
                className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                style={{ backgroundImage: CTA_GRADIENT }}>
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (<>Send Reset Link<ArrowRight size={20} /></>)}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center pt-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="font-['Poppins'] text-[22px] font-semibold text-gray-900 mb-2">Check your inbox</h2>
              <p className="font-['Poppins'] text-[14px] text-gray-500 mb-2 max-w-[280px]">We've sent a password reset link to</p>
              <p className="font-['Poppins'] text-[14px] font-semibold text-gray-800 mb-6">{resetEmail}</p>
              <p className="font-['Poppins'] text-[13px] text-gray-400 mb-8">
                Didn't receive it? Check your spam folder or{" "}
                <button onClick={() => setResetSent(false)} className="text-blue-600 font-medium hover:text-blue-700 transition-colors">try again</button>
              </p>
              <button onClick={exitForgotPassword} className="w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2" style={{ backgroundImage: CTA_GRADIENT }}>
                Back to Login<ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      </AuthDesktopShell>
    );
  }

  // ═══════════════════════════════════════════════
  // RENDER: OTP Verification (Step 2 after signup)
  // ═══════════════════════════════════════════════
  if (authStep === "otp") {
    return (
      <AuthDesktopShell stepLabel="Verify Email">
      <div className="min-h-screen bg-white flex flex-col lg:min-h-0">
        <div className="relative h-[180px] overflow-hidden shrink-0 lg:hidden" style={{ backgroundImage: CTA_GRADIENT }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          <div className="absolute top-5 left-0 right-0 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2" style={{ background: GLASS_BG }}>
              <ShieldCheck size={24} className="text-white" />
            </div>
            <h1 className="font-['Poppins'] text-[22px] font-semibold text-white">Verify your email</h1>
            <p className="font-['Poppins'] text-[12px] text-white/80 mt-0.5">One more step to secure your account</p>
          </div>
        </div>

        <div className="flex-1 px-6 -mt-4 relative z-10 pb-6 lg:mt-0 lg:px-12 lg:py-8 lg:max-w-[520px] lg:mx-auto lg:w-full">
          {otpVerified ? (
            <div className="flex flex-col items-center text-center pt-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="font-['Poppins'] text-[22px] font-semibold text-gray-900 mb-2">Email verified!</h2>
              <p className="font-['Poppins'] text-[14px] text-gray-500">Taking you to the next step...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail size={16} className="text-blue-600" />
                  <p className="font-['Poppins'] text-[14px] text-gray-500">We sent a 6-digit code to</p>
                </div>
                <p className="font-['Poppins'] text-[15px] font-semibold text-gray-800">{email}</p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center gap-3 mb-6">
                {otpValues.map((val, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    className={`w-12 h-14 text-center text-[22px] font-['Poppins'] font-semibold rounded-xl border-2 bg-gray-50 focus:outline-none transition-all ${
                      otpError
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : val
                        ? "border-blue-400 bg-blue-50 focus:ring-2 focus:ring-blue-200"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    }`}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {otpError && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2">
                  <XCircle size={16} className="text-red-500 shrink-0" />
                  <p className="font-['Poppins'] text-[13px] text-red-600">{otpError}</p>
                </div>
              )}

              {otpVerifying && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Loader2 size={18} className="text-blue-600 animate-spin" />
                  <p className="font-['Poppins'] text-[14px] text-blue-600">Verifying...</p>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="font-['Poppins'] text-[13px] text-gray-400">
                  Didn't receive the code?{" "}
                  {canResend ? (
                    <button onClick={handleResendOtp} className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Resend</button>
                  ) : (
                    <span className="text-gray-400">Resend in {resendTimer}s</span>
                  )}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
                <p className="font-['Poppins'] text-[12px] text-blue-600 text-center">
                  Demo mode — enter any 6 digits to verify
                </p>
              </div>

              <button onClick={() => setAuthStep("auth")} className="w-full text-center text-[14px] font-['Poppins'] text-gray-400 hover:text-gray-600 transition-colors">
                Back
              </button>
            </>
          )}
        </div>
      </div>
      </AuthDesktopShell>
    );
  }

  // ═══════════════════════════════════════════════
  // RENDER: Instagram + Interests (Step 3 after OTP)
  // ═══════════════════════════════════════════════
  if (authStep === "interests") {
    return (
      <AuthDesktopShell stepLabel="Personalize">
      <div className="min-h-screen bg-white flex flex-col lg:min-h-0">
        <div className="flex-1 px-6 pt-6 overflow-y-auto pb-6 animate-in fade-in duration-500 lg:px-12 lg:py-8 lg:max-w-[640px] lg:mx-auto lg:w-full">
          <h2 className="font-['Poppins'] text-[24px] font-semibold text-gray-900 mb-2">
            Personalize your experience
          </h2>
          <p className="font-['Poppins'] text-[14px] text-gray-500 mb-6">
            Connect your Instagram and pick your interests
          </p>

          {/* Instagram Handle */}
          <div className="mb-6">
            <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
              <Instagram size={14} className="text-pink-500" />
              Instagram Handle
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-['Poppins'] text-gray-400">@</span>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => {
                  onInstagramHandleChange(e.target.value);
                }}
                placeholder="yourusername"
                className={`w-full pl-8 pr-12 py-3.5 rounded-xl bg-gray-50 border text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                  igFetched ? "border-green-300 focus:border-green-400" : "border-gray-200 focus:border-blue-400"
                }`}
              />
              {/* Inline status indicator */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {igLoading && <Loader2 size={16} className="text-purple-500 animate-spin" />}
                {igFetched && !igLoading && <CheckCircle size={16} className="text-green-500" />}
              </div>
            </div>

            {igError && (
              <div className="mt-2 flex items-center gap-1.5">
                <XCircle size={13} className="text-red-500" />
                <p className="font-['Poppins'] text-[12px] text-red-500">{igError}</p>
              </div>
            )}

            {/* Instagram Profile Card */}
            {igProfile && igFetched && (
              <div className="mt-3 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border border-purple-100 rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <Instagram size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-['Poppins'] text-[14px] font-semibold text-gray-900 truncate">{igProfile.fullName}</p>
                      {igProfile.isVerified && <CheckCircle size={14} className="text-blue-500 shrink-0" />}
                    </div>
                    <p className="font-['Poppins'] text-[12px] text-gray-500">@{igProfile.username} · {igProfile.category}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-white/70 rounded-xl px-2 py-2 text-center">
                    <Users size={14} className="text-purple-500 mx-auto mb-1" />
                    <p className="font-['Poppins'] text-[14px] font-semibold text-gray-900">{formatCount(igProfile.followersCount)}</p>
                    <p className="font-['Poppins'] text-[10px] text-gray-500">Followers</p>
                  </div>
                  <div className="bg-white/70 rounded-xl px-2 py-2 text-center">
                    <Users size={14} className="text-blue-500 mx-auto mb-1" />
                    <p className="font-['Poppins'] text-[14px] font-semibold text-gray-900">{formatCount(igProfile.followingCount)}</p>
                    <p className="font-['Poppins'] text-[10px] text-gray-500">Following</p>
                  </div>
                  <div className="bg-white/70 rounded-xl px-2 py-2 text-center">
                    <ImageIcon size={14} className="text-pink-500 mx-auto mb-1" />
                    <p className="font-['Poppins'] text-[14px] font-semibold text-gray-900">{formatCount(igProfile.postsCount)}</p>
                    <p className="font-['Poppins'] text-[10px] text-gray-500">Posts</p>
                  </div>
                  <div className="bg-white/70 rounded-xl px-2 py-2 text-center">
                    <TrendingUp size={14} className="text-green-500 mx-auto mb-1" />
                    <p className="font-['Poppins'] text-[14px] font-semibold text-gray-900">{igProfile.engagementRate}%</p>
                    <p className="font-['Poppins'] text-[10px] text-gray-500">Engage</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="flex-1 bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                    <Sparkles size={13} className="text-yellow-500" />
                    <div>
                      <p className="font-['Poppins'] text-[12px] font-semibold text-gray-900">{formatCount(igProfile.estimatedReach)}</p>
                      <p className="font-['Poppins'] text-[10px] text-gray-500">Est. Reach</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-white/70 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span className="text-[13px]">❤️</span>
                    <div>
                      <p className="font-['Poppins'] text-[12px] font-semibold text-gray-900">{formatCount(igProfile.avgLikes)}</p>
                      <p className="font-['Poppins'] text-[10px] text-gray-500">Avg. Likes</p>
                    </div>
                  </div>
                </div>
                <p className="font-['Poppins'] text-[11px] text-gray-400 mt-2 text-center">Data auto-fetched from Instagram</p>
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="mb-2">
            <h3 className="font-['Poppins'] text-[15px] font-semibold text-gray-900 mb-1">What are you into?</h3>
            <p className="font-['Poppins'] text-[13px] text-gray-500 mb-4">Pick at least one to personalize your feed</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {interestOptions.map((interest) => {
              const isSelected = selectedInterests.includes(interest.label);
              return (
                <button
                  key={interest.label}
                  onClick={() => toggleInterest(interest.label)}
                  className={`relative flex items-center gap-2 px-3 py-3 rounded-2xl border-2 transition-all overflow-hidden lg:flex-col lg:items-center lg:gap-2 lg:px-3 lg:py-4 ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-blue-100" : "bg-white"}`}>
                    <interest.icon size={18} style={{ color: isSelected ? "#155DFC" : interest.color }} />
                  </div>
                  <span className={`font-['Poppins'] text-[12px] lg:text-[13px] font-medium text-left lg:text-center leading-tight min-w-0 ${isSelected ? "text-blue-700" : "text-gray-700"}`}>
                    {interest.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleInterestsDone}
            disabled={selectedInterests.length < 1}
            className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedInterests.length < 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
            style={{ backgroundImage: CTA_GRADIENT }}
          >
            Continue
            <ChevronRight size={20} />
          </button>

          <button
            onClick={() => {
              // Allow skipping — still need to create account first
              signup(email, password);
              if (selectedInterests.length > 0) updateUser({ interests: selectedInterests });
              navigate("/", { replace: true });
            }}
            className="w-full mt-4 text-center text-[14px] font-['Poppins'] text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
      </AuthDesktopShell>
    );
  }

  // ═══════════════════════════════════════════════
  // RENDER: Auth form (Login / Sign Up)
  // ═══════════════════════════════════════════════
  return (
    <AuthDesktopShell stepLabel={mode === "login" ? "Welcome Back" : "Create Account"}>
    <div className="min-h-screen bg-white flex flex-col lg:min-h-0">
      {/* Hero gradient section — mobile only */}
      <div className="relative h-[220px] overflow-hidden lg:hidden" style={{ backgroundImage: CTA_GRADIENT }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        <div className="absolute top-7 left-0 right-0 flex flex-col items-center">
          <CityUnlockLogo layout="stacked" size={44} variant="onGradient" />
          <p className="font-['Poppins'] text-[13px] text-white/80 mt-1.5">Creator-led trail experiences</p>
        </div>
      </div>

      {/* Auth form */}
      <div className="flex-1 px-6 -mt-6 relative z-10 lg:mt-0 lg:px-12 lg:py-8 lg:max-w-[560px] lg:mx-auto lg:w-full">
        {/* Mode tabs */}
        <div className="flex gap-1 mb-6 bg-[#ECEDF2] rounded-full p-1.5">
          <button
            onClick={() => { setMode("login"); setError(""); setConfirmPassword(""); }}
            className={`flex-1 py-2.5 rounded-full text-[14px] font-['Poppins'] font-medium transition-all ${
              mode === "login" ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "text-gray-500"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-2.5 rounded-full text-[14px] font-['Poppins'] font-medium transition-all ${
              mode === "signup" ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "text-gray-500"
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
          {mode === "login" ? "Sign in to continue your trail adventures" : "Join the community and start exploring"}
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
            <p className="font-['Poppins'] text-[13px] text-red-600">{error}</p>
          </div>
        )}

        {/* Form fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "Min 6 characters" : "Enter your password"}
                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
              </div>
            </div>
          )}
        </div>

        {/* Forgot password (login only) */}
        {mode === "login" && (
          <div className="flex justify-end mb-6">
            <button onClick={() => { setForgotPassword(true); setResetEmail(email); setError(""); }}
              className="text-[13px] font-['Poppins'] font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit button */}
        <button onClick={handleSubmit} disabled={loading}
          className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          style={{ backgroundImage: CTA_GRADIENT }}>
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
          <button onClick={switchMode} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
    </AuthDesktopShell>
  );
}