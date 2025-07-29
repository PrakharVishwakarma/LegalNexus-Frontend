// frontend/src/Components/FlashMessage.js

import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { flashMessageState } from "../../recoil/atoms/flashMessageAtom";

// Custom Icons
const SuccessIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FlashMessage = () => {
  const message = useRecoilValue(flashMessageState);
  const setFlashMessage = useSetRecoilState(flashMessageState);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setFlashMessage(null);
      setIsVisible(false);
      setIsExiting(false);
    }, 300); // Match the animation duration
  }, [setFlashMessage, setIsVisible, setIsExiting]);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setIsExiting(false);

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, handleDismiss]);



  if (!message || !isVisible) return null;

  const getMessageConfig = () => {
    switch (message.type) {
      case "success":
        return {
          icon: SuccessIcon,
          bgGradient: "from-emerald-500 to-green-600",
          borderColor: "border-emerald-400",
          shadowColor: "shadow-emerald-500/25",
          accentColor: "bg-emerald-400",
          textColor: "text-emerald-50"
        };
      case "error":
        return {
          icon: ErrorIcon,
          bgGradient: "from-red-500 to-rose-600",
          borderColor: "border-red-400",
          shadowColor: "shadow-red-500/25",
          accentColor: "bg-red-400",
          textColor: "text-red-50"
        };
      case "warning":
        return {
          icon: WarningIcon,
          bgGradient: "from-amber-500 to-orange-600",
          borderColor: "border-amber-400",
          shadowColor: "shadow-amber-500/25",
          accentColor: "bg-amber-400",
          textColor: "text-amber-50"
        };
      case "info":
      default:
        return {
          icon: InfoIcon,
          bgGradient: "from-blue-500 to-indigo-600",
          borderColor: "border-blue-400",
          shadowColor: "shadow-blue-500/25",
          accentColor: "bg-blue-400",
          textColor: "text-blue-50"
        };
    }
  };

  const config = getMessageConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      <div
        className={`
          max-w-md w-full min-w-[320px] pointer-events-auto
          transform transition-all duration-300 ease-out
          ${isExiting ? 'translate-x-[400px] opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'}
        `}
      >
        {/* Main Flash Message Container */}
        <div className={`
          relative overflow-hidden rounded-2xl shadow-2xl ${config.shadowColor}
          bg-gradient-to-r ${config.bgGradient}
          border ${config.borderColor} backdrop-blur-sm
          transform transition-all duration-300 hover:scale-[1.02]
        `}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                          transform -skew-x-12 animate-pulse"></div>
          </div>

          {/* Left Accent Bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.accentColor}`}></div>

          {/* Content Container */}
          <div className="relative flex items-start p-4 pr-12">
            {/* Icon Container */}
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-xl ${config.accentColor} 
              flex items-center justify-center mr-3 shadow-lg
              transform transition-transform duration-200 hover:scale-110
            `}>
              <IconComponent />
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className={`font-semibold ${config.textColor} text-sm leading-tight`}>
                {message.title || message.type.charAt(0).toUpperCase() + message.type.slice(1)}
              </div>
              <div className={`${config.textColor} text-sm mt-1 leading-relaxed opacity-95`}>
                {message.text}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className={`
              absolute top-3 right-3 p-1.5 rounded-lg
              ${config.textColor} hover:bg-white/20 
              transition-all duration-200 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-white/30
            `}
            aria-label="Dismiss notification"
          >
            <CloseIcon />
          </button>

          {/* Progress Bar for Auto-dismiss */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <div
              className="h-full bg-white/30 origin-left transform scale-x-0 animate-[progress_5s_linear_forwards]"
              style={{
                animation: isExiting ? 'none' : 'progress 5s linear forwards'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animation */}
      {/* <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style> */}
    </div>
  );
};

export default FlashMessage;