import { X, Smartphone, MapPin } from "lucide-react";

interface MobileOnlyModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function MobileOnlyModal({
  open,
  onClose,
  title = "Continue on Mobile",
  description = "Location check-in requires GPS on your mobile device. Open UnlockTrails on your phone to check in when you're at the stop.",
}: MobileOnlyModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[380px] p-6 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
            }}
          >
            <Smartphone size={28} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-['Poppins'] font-semibold text-gray-900 text-center mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[14px] font-['Poppins'] text-gray-500 text-center leading-relaxed mb-5">
          {description}
        </p>

        {/* Info card */}
        <div className="flex items-start gap-2.5 bg-blue-50 rounded-xl px-3.5 py-3 mb-6">
          <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[12px] font-['Poppins'] text-blue-700 leading-relaxed">
            Check-in uses your phone's GPS to verify you're within the stop's
            perimeter. This feature is only available on mobile devices.
          </p>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-full text-white font-['Poppins'] text-[14px] font-semibold transition-opacity hover:opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
          }}
        >
          Got It
        </button>
      </div>
    </div>
  );
}
