import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ChevronLeft,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Sparkles,
  Users,
  Star,
  Lock,
  Route,
  Eye,
  Calendar,
  Trophy,
  Minus,
  Plus,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { trails } from "../data/trailData";
import { useUser } from "../data/userStore";
import { getCachedEventbriteTrails } from "../data/eventbriteService";

// Helper: get numeric price for any trail
function getNumericPrice(trail: { isFree?: boolean; numericPrice?: number; price: string }): number {
  if (trail.isFree) return 0;
  if (trail.numericPrice != null) return trail.numericPrice;
  const priceMap: Record<string, number> = { "$": 15, "$$": 25, "$$$": 45 };
  return priceMap[trail.price] || 25;
}

function getDisplayPrice(trail: { isFree?: boolean; numericPrice?: number; currency?: string; price: string }): string {
  if (trail.isFree) return "Free";
  const amount = getNumericPrice(trail);
  return `${trail.currency === "USD" || !trail.currency ? "$" : trail.currency}${amount.toFixed(0)}`;
}

export function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, joinTrail } = useUser();
  const trail = trails.find((t) => t.id === id) || (user.createdTrails || []).find((t) => t.id === id) || getCachedEventbriteTrails().find((t) => t.id === id) || trails[0];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"card" | "apple">(
    "card"
  );
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [groupSize, setGroupSize] = useState(1);

  // Generate upcoming date options from trail.date
  const baseDateStr = trail.date; // e.g. "15 Jan 2026" or "Jan 15, 2026"
  const dateOptions = (() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    // Try parsing with Date constructor first (handles both "15 Jan 2026" and "Jan 15, 2026")
    let base = new Date(baseDateStr);
    if (isNaN(base.getTime())) {
      // Fallback: try "DD Mon YYYY" format manually
      const parts = baseDateStr.split(" ");
      const day = parseInt(parts[0]);
      const monthIdx = months.indexOf(parts[1]);
      const year = parseInt(parts[2]);
      if (!isNaN(day) && monthIdx >= 0 && !isNaN(year)) {
        base = new Date(year, monthIdx, day);
      } else {
        base = new Date(); // ultimate fallback: today
      }
    }

    return [0, 3, 7, 14].map((offset) => {
      const d = new Date(base.getTime() + offset * 86400000);
      return {
        label: offset === 0 ? "Original" : `+${offset}d`,
        day: days[d.getDay()],
        date: d.getDate(),
        month: months[d.getMonth()],
        full: `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
      };
    });
  })();

  // Pricing
  const trailPrice = getNumericPrice(trail);
  const serviceFee = trailPrice === 0 ? 0 : 5.40;
  const groupTotal = trailPrice * groupSize;
  const groupServiceFee = serviceFee * groupSize;
  const total = groupTotal + groupServiceFee;

  // Strip @ from host handle for display
  const hostDisplayName = trail.hostHandle.replace(/^@/, "");

  const handlePay = () => {
    setProcessing(true);
    // Simulate Stripe payment processing
    setTimeout(() => {
      setProcessing(false);
      setConfirmed(true);
      joinTrail(trail.id);
    }, 2000);
  };

  /* ───────── Confirmation Screen ───────── */
  if (confirmed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center max-w-[320px]">
          <div
            className="w-[76px] h-[76px] rounded-full flex items-center justify-center mb-6"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            <CheckCircle2 size={38} className="text-white" />
          </div>
          <h1 className="text-[24px] font-['Poppins'] font-semibold text-gray-900 mb-2">
            You're In!
          </h1>
          <p className="text-[15px] font-['Poppins'] text-gray-500 leading-relaxed mb-1">
            Your spot on{" "}
            <span className="font-medium text-gray-800">{trail.title}</span> is
            confirmed.
          </p>
          <p className="text-[13px] font-['Poppins'] text-gray-400 mb-10">
            {trail.date} · {trail.totalStops} stops · {trail.totalDuration}
          </p>

          <button
            onClick={() => navigate(`/trail/${trail.id}`)}
            className="w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            Start Your Trail
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 mt-2 font-['Poppins'] text-[14px] font-medium text-gray-500"
          >
            Back to Discovery
          </button>
        </div>
      </div>
    );
  }

  /* ───────── Checkout Screen ───────── */
  return (
    <div className="relative min-h-screen bg-[#f7f7f8]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 lg:px-8 pt-4 pb-3 flex items-center gap-3 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[18px] font-['Poppins'] font-semibold text-gray-900">
          Confirm & Pay
        </h1>
      </div>

      <div className="px-4 lg:px-8 pt-4 pb-44 lg:pb-12 lg:max-w-4xl lg:mx-auto">
        {/* Trail Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-3">
          <div className="flex gap-3.5 p-3.5">
            <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0">
              <ImageWithFallback
                src={trail.image}
                alt={trail.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h2 className="text-[18px] font-['Poppins'] font-normal text-gray-900 leading-snug mb-1.5" style={{ fontWeight: 400 }}>
                {trail.title}
              </h2>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-gray-400" />
                <span className="text-[13px] font-['Poppins'] text-gray-500">
                  {trail.date} · {trail.totalDuration}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={13} className="text-gray-400" />
                <span className="text-[13px] font-['Poppins'] text-gray-500">
                  {trail.totalStops} stops · {trail.distance}
                </span>
              </div>
              <p className="text-[11px] font-['Poppins'] text-gray-400 italic mt-1 truncate">
                {trail.vibe}
              </p>
            </div>
          </div>

          {/* Host row */}
          <div className="h-px bg-gray-100 mx-3.5" />
          <div className="px-3.5 py-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100">
              <ImageWithFallback
                src={trail.hostAvatar}
                alt={hostDisplayName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[13px] font-['Poppins'] text-gray-500">
              Curated by{" "}
              <span className="font-medium text-gray-800">
                {hostDisplayName}
              </span>
            </span>
            <div className="ml-auto flex items-center gap-1">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[13px] font-['Poppins'] font-medium text-gray-700">
                {trail.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-gray-500" />
            <h3 className="text-[15px] font-['Poppins'] font-semibold text-gray-900">
              Choose Date
            </h3>
          </div>
          <div className="flex gap-2">
            {dateOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedDateIdx(i)}
                className={`flex-1 flex flex-col items-center py-2.5 rounded-xl border-2 transition-all ${
                  selectedDateIdx === i
                    ? "border-blue-500 bg-blue-50/40"
                    : "border-gray-100 bg-white"
                }`}
              >
                <span className="text-[10px] font-['Poppins'] text-gray-400">
                  {opt.day}
                </span>
                <span className="text-[16px] font-['Poppins'] font-semibold text-gray-800">
                  {opt.date}
                </span>
                <span className="text-[10px] font-['Poppins'] text-gray-400">
                  {opt.month}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Group Size Selector */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              <div>
                <h3 className="text-[15px] font-['Poppins'] font-semibold text-gray-900">
                  Group Size
                </h3>
                <p className="text-[12px] font-['Poppins'] text-gray-400">
                  ${trailPrice.toFixed(0)} per person
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                disabled={groupSize <= 1}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 active:scale-90 transition-transform"
              >
                <Minus size={14} className="text-gray-600" />
              </button>
              <span className="text-[16px] font-['Poppins'] font-semibold text-gray-800 w-6 text-center">
                {groupSize}
              </span>
              <button
                onClick={() => setGroupSize(Math.min(8, groupSize + 1))}
                disabled={groupSize >= 8}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 active:scale-90 transition-transform"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
          <h3 className="text-[15px] font-['Poppins'] font-semibold text-gray-900 mb-3">
            What's Included
          </h3>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: MapPin,
                label: "Curated Stops",
                desc: `${trail.totalStops} hand-picked spots by ${hostDisplayName}`,
              },
              {
                icon: Route,
                label: "Full Trail Access",
                desc: "Progressive stop reveals with insider tips",
              },
              {
                icon: Eye,
                label: "Exclusive Content",
                desc: "Creator notes, photos & hidden gems",
              },
              {
                icon: Users,
                label: "Community",
                desc: `Join ${trail.joined}+ explorers on this trail`,
              },
              {
                icon: Trophy,
                label: "Completion Reward",
                desc: "Earn an exclusive badge when you finish all stops",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-['Poppins'] font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-[12px] font-['Poppins'] text-gray-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
          <h3 className="text-[15px] font-['Poppins'] font-semibold text-gray-900 mb-3">
            Payment Method
          </h3>
          <div className="flex flex-col gap-2.5">
            {/* Credit / Debit Card */}
            <button
              onClick={() => setSelectedPayment("card")}
              className={`flex items-center gap-3 px-3.5 py-3.5 rounded-xl border-2 transition-all ${
                selectedPayment === "card"
                  ? "border-blue-500 bg-blue-50/40"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedPayment === "card"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPayment === "card" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <CreditCard size={18} className="text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-['Poppins'] font-medium text-gray-800">
                  Credit or Debit Card
                </p>
                <p className="text-[12px] font-['Poppins'] text-gray-400">
                  Visa, Mastercard, Amex
                </p>
              </div>
            </button>

            {/* Apple Pay */}
            <button
              onClick={() => setSelectedPayment("apple")}
              className={`flex items-center gap-3 px-3.5 py-3.5 rounded-xl border-2 transition-all ${
                selectedPayment === "apple"
                  ? "border-blue-500 bg-blue-50/40"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedPayment === "apple"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPayment === "apple" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white text-[16px] font-medium" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
                  &#63743;
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-['Poppins'] font-medium text-gray-800">
                  Apple Pay
                </p>
                <p className="text-[12px] font-['Poppins'] text-gray-400">
                  Quick & secure checkout
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3">
          <h3 className="text-[15px] font-['Poppins'] font-semibold text-gray-900 mb-3">
            Price Breakdown
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-['Poppins'] text-gray-600">
                Trail access × {groupSize}
              </span>
              <span className="text-[14px] font-['Poppins'] font-medium text-gray-800">
                ${groupTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-['Poppins'] text-gray-600">
                Service fee
              </span>
              <span className="text-[14px] font-['Poppins'] font-medium text-gray-800">
                ${groupServiceFee.toFixed(2)}
              </span>
            </div>
            <div className="h-px bg-gray-100 my-0.5" />
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-['Poppins'] font-semibold text-gray-900">
                Total
              </span>
              <span className={`text-[18px] font-['Poppins'] font-semibold ${total === 0 ? "" : "text-gray-900"}`} style={total === 0 ? { color: "#00EC20" } : undefined}>
                {total === 0 ? "Free" : `$${total.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2.5 px-2">
          <ShieldCheck size={16} className="text-green-500 shrink-0" />
          <span className="text-[12px] font-['Poppins'] text-gray-400">
            Payments processed securely by Stripe. Card details are never stored
            on our servers.
          </span>
        </div>
      </div>

      {/* Fixed Bottom Pay Button — above everything, no bottom nav interference */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto bg-white border-t border-gray-100 z-30 px-4 pt-3 pb-5 lg:static lg:max-w-4xl lg:border-0 lg:bg-transparent lg:px-8 lg:pt-0 lg:pb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-['Poppins'] text-gray-500">
            Total
          </span>
          <span className={`text-[18px] font-['Poppins'] font-semibold ${total === 0 ? "" : "text-gray-900"}`} style={total === 0 ? { color: "#00EC20" } : undefined}>
            {total === 0 ? "Free" : `$${total.toFixed(2)}`}
          </span>
        </div>
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2.5 disabled:opacity-70 active:scale-[0.98] transition-transform"
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
          }}
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock size={17} />
              {total === 0 ? <span style={{ color: "#00EC20" }}>Join Trail — It's Free!</span> : `Pay $${total.toFixed(2)} & Join Trail`}
            </>
          )}
        </button>
        <p className="text-center text-[11px] font-['Poppins'] text-gray-400 mt-2.5">
          By confirming, you agree to the Terms of Service
        </p>
      </div>
    </div>
  );
}