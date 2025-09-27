"use client";
import { useEffect } from "react";
import { FaTwitter, FaFacebook, FaWhatsapp, FaLink, FaTimes } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform?: string) => void;
  title: string;
  url: string;
}

export default function ShareModal({ isOpen, onClose, onShare, title, url }: ShareModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shareText = `${title} - Check out this post!`;

  const shareOptions = [
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      onClick: () => onShare("twitter"),
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      onClick: () => onShare("facebook"),
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      onClick: () => onShare("whatsapp"),
    },
    {
      name: "Copy Link",
      icon: FaLink,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      onClick: () => onShare("clipboard"),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Share Post</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Share Options */}
        <div className="grid grid-cols-4 gap-4 p-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.onClick}
              className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`p-3 rounded-full ${option.bgColor}`}>
                <option.icon className={`text-xl ${option.color}`} />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {option.name}
              </span>
            </button>
          ))}
        </div>

        {/* URL Preview */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Share URL</p>
          <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1">
              {url}
            </span>
            <button
              onClick={() => onShare("clipboard")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}