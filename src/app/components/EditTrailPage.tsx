import { useState, useEffect } from "react";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  Tag,
  FileText,
  Trash2,
  Save,
  AlertTriangle,
  X,
  Users,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../data/userStore";
import { showToast } from "./Toast";

const CATEGORY_TAGS = [
  { label: "Food", emoji: "\uD83C\uDF54", tag: "food" },
  { label: "Coffee", emoji: "\u2615", tag: "coffee" },
  { label: "Art", emoji: "\uD83C\uDFA8", tag: "art" },
  { label: "Nature", emoji: "\uD83C\uDF3F", tag: "nature" },
  { label: "Nightlife", emoji: "\uD83C\uDF19", tag: "nightlife" },
  { label: "Music", emoji: "\uD83C\uDFB5", tag: "music" },
  { label: "Photo", emoji: "\uD83D\uDCF8", tag: "photo" },
  { label: "Sport", emoji: "\uD83D\uDCAA", tag: "sport" },
  { label: "Shopping", emoji: "\uD83D\uDECD\uFE0F", tag: "shopping" },
  { label: "Wellness", emoji: "\uD83E\uDDD8", tag: "wellness" },
];

const TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Anytime"];

export function EditTrailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, updateCreatedTrail, deleteCreatedTrail } = useUser();

  const trail = user.createdTrails.find((t) => t.id === id);

  // Edit state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [neighborhood, setNeighborhood] = useState("");
  const [vibe, setVibe] = useState("");
  const [bestTimeOfDay, setBestTimeOfDay] = useState("Anytime");
  const [groupFriendly, setGroupFriendly] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (trail) {
      setTitle(trail.title);
      setDescription(trail.description);
      setDate(trail.date);
      setDuration(trail.duration);
      setPrice(trail.price);
      setTags(trail.tags);
      setNeighborhood(trail.neighborhood);
      setVibe(trail.vibe);
      setBestTimeOfDay(trail.bestTimeOfDay);
      setGroupFriendly(trail.groupFriendly);
    }
  }, [trail]);

  if (!trail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#ECEDF2] rounded-[20px] flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-gray-400" />
          </div>
          <h2 className="font-['Poppins'] text-[18px] font-semibold text-gray-900 mb-2">
            Trail not found
          </h2>
          <p className="font-['Poppins'] text-[13px] text-gray-400 mb-6">
            This trail may have been deleted or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2.5 rounded-full text-[13px] font-['Poppins'] font-semibold text-white"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  const isUpcoming = true; // In a real app, compare trail.date with current date

  const handleSave = async () => {
    if (!title.trim()) {
      showToast("Title required", "Give your trail a name");
      return;
    }
    setIsSaving(true);
    // Simulate save delay
    await new Promise((r) => setTimeout(r, 800));
    updateCreatedTrail(trail.id, {
      title: title.trim(),
      description: description.trim(),
      date,
      duration,
      price,
      tags,
      neighborhood,
      vibe,
      bestTimeOfDay,
      groupFriendly,
    });
    setIsSaving(false);
    showToast("Trail updated", "Your changes have been saved");
    navigate("/profile");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 1000));
    deleteCreatedTrail(trail.id, deleteReason.trim() || undefined);
    setIsDeleting(false);
    setShowDeleteModal(false);
    showToast(
      "Trail deleted",
      trail.joined > 0
        ? `${trail.joined} participant${trail.joined > 1 ? "s" : ""} will be notified`
        : "Trail has been removed"
    );
    navigate("/profile");
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-12">
      {/* Header */}
      <div
        className="relative px-4 lg:px-8 pt-4 pb-14"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
        }}
      >
        <div className="flex items-center justify-between lg:max-w-4xl lg:mx-auto">
          <button
            onClick={() => navigate("/profile")}
            className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.7)] backdrop-blur-md rounded-full p-2"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <h1 className="font-['Poppins'] text-[17px] font-semibold text-white">
            Edit Trail
          </h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.7)] backdrop-blur-md rounded-full p-2"
          >
            {isSaving ? (
              <Loader2 size={18} className="text-white animate-spin" />
            ) : (
              <Save size={18} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-8 -mt-8 relative z-10 bg-white rounded-t-[24px] pt-6">
        <div className="lg:max-w-4xl lg:mx-auto space-y-5">
          {/* Trail Cover Preview */}
          <div className="relative h-[160px] rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={trail.image}
              alt={trail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-[11px] font-['Poppins'] text-white flex items-center gap-1">
                  <MapPin size={10} />
                  {trail.totalStops} stops
                </span>
                <span className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-[11px] font-['Poppins'] text-white flex items-center gap-1">
                  <Users size={10} />
                  {trail.joined} joined
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 block">
              Trail Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[14px] font-['Poppins'] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Give your trail a name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 flex items-center gap-1.5">
              <FileText size={12} />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[13px] font-['Poppins'] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none transition-all"
              placeholder="Describe your trail..."
            />
          </div>

          {/* Date & Duration Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Calendar size={12} />
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[13px] font-['Poppins'] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="e.g. 15 Mar 2026"
              />
            </div>
            <div>
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Clock size={12} />
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[13px] font-['Poppins'] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="e.g. ~2 hrs"
              />
            </div>
          </div>

          {/* Price & Neighborhood Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 block">
                Price Range
              </label>
              <div className="flex gap-2">
                {["$", "$$", "$$$"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrice(p)}
                    className={`flex-1 py-2.5 rounded-xl text-[13px] font-['Poppins'] font-medium transition-all ${
                      price === p
                        ? "bg-gray-900 text-white"
                        : "bg-[#ECEDF2] text-gray-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 flex items-center gap-1.5">
                <MapPin size={12} />
                Neighborhood
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[13px] font-['Poppins'] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="e.g. Silver Lake"
              />
            </div>
          </div>

          {/* Vibe */}
          <div>
            <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 block">
              Vibe
            </label>
            <input
              type="text"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[13px] font-['Poppins'] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="e.g. Chill weekend vibes"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-2 flex items-center gap-1.5">
              <Tag size={12} />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_TAGS.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => toggleTag(t.tag)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-['Poppins'] transition-all ${
                    tags.includes(t.tag)
                      ? "bg-gray-900 text-white"
                      : "bg-[#ECEDF2] text-gray-600"
                  }`}
                >
                  <span className="text-[12px]">{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Best Time & Group Friendly */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-2 block">
                Best Time
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setBestTimeOfDay(t)}
                    className={`px-3 py-2 rounded-full text-[11px] font-['Poppins'] font-medium transition-all ${
                      bestTimeOfDay === t
                        ? "bg-gray-900 text-white"
                        : "bg-[#ECEDF2] text-gray-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-2 block">
                Group Friendly
              </label>
              <button
                onClick={() => setGroupFriendly(!groupFriendly)}
                className={`w-full py-2.5 rounded-xl text-[13px] font-['Poppins'] font-medium flex items-center justify-center gap-2 transition-all ${
                  groupFriendly
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-[#ECEDF2] text-gray-500"
                }`}
              >
                <Users size={14} />
                {groupFriendly ? "Yes" : "No"}
              </button>
            </div>
          </div>

          {/* Stops Preview (read-only) */}
          <div>
            <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-2 block">
              Trail Stops ({trail.stops.length})
            </label>
            <div className="space-y-2">
              {trail.stops.map((stop, idx) => (
                <div
                  key={stop.id}
                  className="flex items-center gap-3 bg-[#ECEDF2] rounded-xl px-3 py-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] font-['Poppins'] font-semibold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={stop.image}
                      alt={stop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Poppins'] text-[13px] font-medium text-gray-900 truncate">
                      {stop.name}
                    </p>
                    <p className="font-['Poppins'] text-[11px] text-gray-400 truncate">
                      {stop.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3.5 rounded-full text-[14px] font-['Poppins'] font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>

          {/* Danger Zone */}
          <div className="border border-red-100 rounded-2xl p-4 mt-4">
            <h4 className="font-['Poppins'] text-[13px] font-semibold text-red-600 mb-1.5 flex items-center gap-2">
              <AlertTriangle size={14} />
              Danger Zone
            </h4>
            <p className="font-['Poppins'] text-[12px] text-gray-500 mb-3">
              Deleting this trail is permanent.
              {trail.joined > 0 && (
                <span className="text-red-500 font-medium">
                  {" "}
                  {trail.joined} participant
                  {trail.joined > 1 ? "s" : ""} will be notified about the
                  cancellation.
                </span>
              )}
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 rounded-xl text-[13px] font-['Poppins'] font-semibold text-red-600 bg-red-50 border border-red-100 flex items-center justify-center gap-2 transition-all active:bg-red-100"
            >
              <Trash2 size={14} />
              Delete Trail
            </button>
          </div>
        </div>
      </div>

      {/* ─── Delete Confirmation Modal ─── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isDeleting && setShowDeleteModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-[430px] lg:max-w-lg bg-white rounded-t-[24px] lg:rounded-[24px] p-6 z-10 animate-in slide-in-from-bottom duration-300">
            {/* Close */}
            <button
              onClick={() => !isDeleting && setShowDeleteModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#ECEDF2] flex items-center justify-center"
              disabled={isDeleting}
            >
              <X size={16} className="text-gray-500" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={26} className="text-red-500" />
            </div>

            <h3 className="font-['Poppins'] text-[18px] font-semibold text-gray-900 text-center mb-1.5">
              Delete this trail?
            </h3>
            <p className="font-['Poppins'] text-[13px] text-gray-500 text-center mb-5">
              This action cannot be undone.
              {trail.joined > 0 && (
                <>
                  {" "}
                  <span className="font-medium text-red-500">
                    {trail.joined} participant
                    {trail.joined > 1 ? "s" : ""}
                  </span>{" "}
                  who joined will receive a cancellation notification.
                </>
              )}
            </p>

            {/* Participants Preview */}
            {trail.joined > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-amber-600" />
                  <span className="font-['Poppins'] text-[12px] font-medium text-amber-700">
                    {trail.joined} participant{trail.joined > 1 ? "s" : ""}{" "}
                    will be notified
                  </span>
                </div>
              </div>
            )}

            {/* Cancellation Reason */}
            <div className="mb-5">
              <label className="font-['Poppins'] text-[12px] font-medium text-gray-500 mb-1.5 flex items-center gap-1.5">
                <MessageCircle size={12} />
                Reason for cancellation (optional)
              </label>
              <textarea
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-[#ECEDF2] text-[13px] font-['Poppins'] text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200 resize-none transition-all"
                placeholder="Let participants know why..."
                disabled={isDeleting}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-full text-[13px] font-['Poppins'] font-semibold text-gray-700 bg-[#ECEDF2] transition-all active:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`flex-1 py-3 rounded-full text-[13px] font-['Poppins'] font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  isDeleting
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 active:bg-red-600"
                }`}
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete Trail
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}