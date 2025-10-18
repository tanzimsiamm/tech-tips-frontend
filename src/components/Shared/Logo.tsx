import Link from "next/link";

type Props = {
  className?: string;
};

export default function Logo({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 no-underline ${className}`}
      aria-label="TechTips&Tricks Logo"
    >
      {/* ---- Icon Mark ---- */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-xl">T</span>
      </div>

      {/* ---- Brand Text ---- */}
      <span className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
        Tech
        <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
          Tips&Tricks
        </span>
      </span>
    </Link>
  );
}
