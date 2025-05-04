import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: "text-2xl",
      text: "text-xl",
    },
    md: {
      icon: "text-4xl",
      text: "text-2xl",
    },
    lg: {
      icon: "text-5xl",
      text: "text-4xl",
    },
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <FaShieldAlt
          className={`${sizeClasses[size].icon} text-blue-400 group-hover:text-blue-300 transition-colors`}
        />
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md -z-10 group-hover:bg-blue-300/20 transition-colors" />
      </div>
      {showText && (
        <span
          className={`${sizeClasses[size].text} font-mono font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-colors uppercase`}
        >
          cyberstrike
        </span>
      )}
    </Link>
  );
}
