"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X, Server } from "lucide-react";

export default function RenderWarning() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this warning in the current session
    const isDismissed = sessionStorage.getItem("render-warning-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("render-warning-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-amber-50/90 backdrop-blur-md border-b border-amber-200   z-100 animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-full hidden sm:flex">
            <Server className="w-5 h-5 text-amber-600 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="font-semibold text-amber-900 text-sm sm:text-base">
                Backend Wake-up Notice
              </span>
            </div>
            <p className="text-amber-800 text-xs sm:text-sm mt-0.5 leading-relaxed">
              Our backend is on Render&apos;s free tier. If any api request takes more than 10 seconds, please wait about <span className="font-bold">1 minute</span> for the server to wake up as the Render server goes to sleep after 15 minutes of inactivity. Thank you for your patience!
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleDismiss}
          className="p-2 hover:bg-amber-200/50 rounded-full transition-colors text-amber-700 hover:text-amber-900 flex-shrink-0"
          aria-label="Dismiss warning"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
