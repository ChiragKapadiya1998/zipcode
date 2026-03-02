import { useState } from "react";
import {
  MapPin,
  Coffee,
  Palette,
  Camera,
  Music,
  ShoppingBag,
  Dumbbell,
  UtensilsCrossed,
  Bike,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Compass,
} from "lucide-react";
import { useUser } from "../data/userStore";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

type AuthMode = "login" | "signup";

// Total steps: 0-Welcome, 1-Interests, 2-Auth, 3-Profile
const TOTAL_STEPS = 4;

export function OnboardingFlow() {
  const { completeOnboarding, signup, login, user } = useUser();
  const [step, setStep] = useState(0);

  // Interests state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Auth state
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Profile state
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleAuthSubmit = () => {
    setAuthError("");
    if (!email.trim()) { setAuthError("Please enter your email"); return; }
    if (!isValidEmail(email)) { setAuthError("Please enter a valid email address"); return; }
    if (!password.trim()) { setAuthError("Please enter your password"); return; }
    if (password.length < 6) { setAuthError("Password must be at least 6 characters"); return; }
    if (authMode === "signup" && password !== confirmPassword) { setAuthError("Passwords don't match"); return; }

    setAuthLoading(true);
    setTimeout(() => {
      const result = authMode === "signup" ? signup(email, password) : login(email, password);
      if (!result.success) {
        setAuthError(result.error || "Something went wrong");
      } else {
        setStep(3);
      }
      setAuthLoading(false);
    }, 600);
  };

  const handleSocialLogin = (socialEmail: string, socialPassword: string) => {
    setAuthLoading(true);
    setTimeout(() => {
      login(socialEmail, socialPassword);
      setAuthLoading(false);
      setStep(3);
    }, 600);
  };

  const handleComplete = () => {
    completeOnboarding({
      name: name || "Explorer",
      handle: handle || "explorer",
      bio: bio || "Trail enthusiast",
      interests: selectedInterests,
    });
  };

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return selectedInterests.length >= 1;
    if (step === 3) return name.trim().length > 0;
    return true;
  };

  // Progress dots — maps the 4 steps into visual dots
  const ProgressDots = () => (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === step ? "w-8 bg-blue-600" : i < step ? "w-3 bg-blue-300" : "w-1.5 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Step 0: Welcome */}
      {step === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full px-6">
            <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
              {/* Hero visual */}
              <div className="relative w-full max-w-[320px] h-[280px] mb-8 rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763477892851-fb7072ae4d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjB0cmFpbCUyMGhpa2luZyUyMG5hdHVyZSUyMHNjZW5pY3xlbnwxfHx8fDE3NzE1MDEzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Adventure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <MapPin size={16} className="text-blue-600" />
                    <span className="font-['Poppins'] text-[13px] text-gray-800 font-medium">
                      4 trails near you
                    </span>
                    <Sparkles size={14} className="text-yellow-500 ml-auto" />
                  </div>
                </div>
              </div>

              <h1 className="font-['Poppins'] text-[28px] font-semibold text-gray-900 mb-3 leading-tight">
                Discover creator-led
                <br />
                trail experiences
              </h1>
              <p className="font-['Poppins'] text-[15px] text-gray-500 mb-8 max-w-[360px] leading-relaxed">
                Follow curated trails by local creators. Unlock stops, earn points,
                and share your journey with the community.
              </p>

              <ProgressDots />

              <button
                onClick={() => setStep(1)}
                className="w-full max-w-[360px] mt-6 py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2"
                style={{
                  backgroundImage:
                    "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                }}
              >
                Get Started
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => {
                  // Skip to auth step — user still needs to log in
                  setStep(2);
                }}
                className="mt-4 text-[14px] font-['Poppins'] text-gray-400 hover:text-gray-600 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Interests */}
      {step === 1 && (
        <div className="flex-1 px-6 pt-6 animate-in fade-in duration-500">
          <button
            onClick={() => setStep(0)}
            className="text-[14px] font-['Poppins'] text-gray-400 mb-6 hover:text-gray-600"
          >
            Back
          </button>

          <h2 className="font-['Poppins'] text-[24px] font-semibold text-gray-900 mb-2">
            What are you into?
          </h2>
          <p className="font-['Poppins'] text-[14px] text-gray-500 mb-6">
            Pick at least one to personalize your feed
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {interestOptions.map((interest) => {
              const isSelected = selectedInterests.includes(interest.label);
              return (
                <button
                  key={interest.label}
                  onClick={() => toggleInterest(interest.label)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-blue-100" : "bg-white"
                    }`}
                  >
                    <interest.icon
                      size={20}
                      style={{ color: isSelected ? "#155DFC" : interest.color }}
                    />
                  </div>
                  <span
                    className={`font-['Poppins'] text-[13px] font-medium text-left ${
                      isSelected ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {interest.label}
                  </span>
                  {isSelected && (
                    <Check size={16} className="text-blue-500 ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <ProgressDots />

          <button
            onClick={() => {
              // If already logged in (e.g. from a previous session), skip auth
              if (user.isLoggedIn) {
                setStep(3);
              } else {
                setStep(2);
              }
            }}
            disabled={!canProceed()}
            className={`w-full mt-6 py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${
              !canProceed() ? "opacity-40 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            Continue
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Step 2: Auth (Login / Sign Up) */}
      {step === 2 && (
        <div className="flex-1 flex flex-col animate-in fade-in duration-500">
          {/* Compact gradient header */}
          <div
            className="relative h-[180px] overflow-hidden shrink-0"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            <div className="absolute top-5 left-0 right-0 flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
                }}
              >
                <Compass size={24} className="text-white" />
              </div>
              <h1 className="font-['Poppins'] text-[22px] font-semibold text-white">
                CityUnlock
              </h1>
              <p className="font-['Poppins'] text-[12px] text-white/80 mt-0.5">
                Almost there — create your account
              </p>
            </div>
          </div>

          <div className="flex-1 px-6 -mt-4 relative z-10 overflow-y-auto pb-6">
            {/* Mode tabs */}
            <div className="flex gap-1 mb-5 bg-[#ECEDF2] rounded-full p-1.5">
              <button
                onClick={() => { setAuthMode("login"); setAuthError(""); setConfirmPassword(""); }}
                className={`flex-1 py-2.5 rounded-full text-[14px] font-['Poppins'] font-medium transition-all ${
                  authMode === "login"
                    ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "text-gray-500"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => { setAuthMode("signup"); setAuthError(""); }}
                className={`flex-1 py-2.5 rounded-full text-[14px] font-['Poppins'] font-medium transition-all ${
                  authMode === "signup"
                    ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error */}
            {authError && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <p className="font-['Poppins'] text-[13px] text-red-600">{authError}</p>
              </div>
            )}

            {/* Form fields */}
            <div className="space-y-4 mb-5">
              <div>
                <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleAuthSubmit()}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={authMode === "signup" ? "Min 6 characters" : "Enter your password"}
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleAuthSubmit()}
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

              {authMode === "signup" && (
                <div>
                  <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                      onKeyDown={(e) => e.key === "Enter" && handleAuthSubmit()}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleAuthSubmit}
              disabled={authLoading}
              className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${
                authLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              style={{
                backgroundImage:
                  "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
              }}
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {authMode === "login" ? "Log In" : "Create Account"}
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12px] font-['Poppins'] text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social login */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => handleSocialLogin("google-user@gmail.com", "google123")}
                disabled={authLoading}
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
                onClick={() => handleSocialLogin("apple-user@icloud.com", "apple123")}
                disabled={authLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13.71 14.13c-.66.97-1.38 1.93-2.45 1.95-1.07.02-1.42-.64-2.64-.64-1.23 0-1.61.62-2.63.66-1.05.04-1.86-1.05-2.53-2.01C2.1 12.11 1.12 8.63 2.53 6.28A4.14 4.14 0 0 1 6.02 4.1c1.03-.02 2 .7 2.63.7.63 0 1.81-.86 3.06-.74.52.02 1.98.21 2.92 1.59-.08.05-1.74 1.02-1.73 3.04.02 2.41 2.12 3.21 2.14 3.22-.02.06-.33 1.15-1.33 2.22ZM10.8 2.46c.55-.67.92-1.6.82-2.53-.79.03-1.75.53-2.32 1.19-.5.58-.95 1.53-.83 2.43.88.07 1.78-.45 2.33-1.09Z" fill="#000"/>
                </svg>
                <span className="text-[13px] font-['Poppins'] font-medium text-gray-700">Apple</span>
              </button>
            </div>

            <ProgressDots />

            {/* Back link */}
            <button
              onClick={() => setStep(1)}
              className="w-full mt-4 text-center text-[14px] font-['Poppins'] text-gray-400 hover:text-gray-600 transition-colors"
            >
              Back to interests
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Profile Setup */}
      {step === 3 && (
        <div className="flex-1 px-6 pt-6 animate-in fade-in duration-500">
          <button
            onClick={() => {
              // Can't go back to auth since they're already logged in
              setStep(1);
            }}
            className="text-[14px] font-['Poppins'] text-gray-400 mb-6 hover:text-gray-600"
          >
            Back
          </button>

          <h2 className="font-['Poppins'] text-[24px] font-semibold text-gray-900 mb-2">
            Set up your profile
          </h2>
          <p className="font-['Poppins'] text-[14px] text-gray-500 mb-8">
            Let others know who you are on trails
          </p>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1618143445406-8ea128a0c18b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXIlMjBwcm9maWxlJTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzcxNTAxMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white cursor-pointer">
                <Camera size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex Rivera"
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-['Poppins'] text-gray-400">
                  @
                </span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace(/\s/g, ""))}
                  placeholder="username"
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-[13px] font-['Poppins'] font-medium text-gray-600 mb-1.5 block">
                Short Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Trail lover, foodie, explorer..."
                rows={2}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all resize-none"
              />
            </div>
          </div>

          <ProgressDots />

          <button
            onClick={handleComplete}
            disabled={!canProceed()}
            className={`w-full mt-6 py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all ${
              !canProceed() ? "opacity-40 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            <Sparkles size={18} />
            Start Exploring
          </button>
        </div>
      )}
    </div>
  );
}
