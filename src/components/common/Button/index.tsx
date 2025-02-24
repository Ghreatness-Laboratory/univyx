import { Link } from "react-router-dom";

interface ButtonProps {
  href?: string;
  children?: React.ReactNode;
  isIconOnly?: boolean;
  ariaLabel?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
}

export default function Button({
  href = "",
  children,
  isIconOnly,
  ariaLabel,
  className,
  target,
  onClick,
}: ButtonProps) {
  if (isIconOnly) {
    return (
      <button
        aria-label={ariaLabel}
        className={`${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={href}
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`bg-primary text-[#FCFCFC] rounded-lg border border-[#64748B] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer ${className}`}
      data-testid="link"
      onClick={onClick}
      target={target}
    >
      {children}
    </Link>
  );
}
