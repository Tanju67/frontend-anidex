import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLink?: boolean;
  link?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
};

function Button({
  children,
  onClick,
  className,
  isLink,
  link,
  type,
  disabled,
}: Props) {
  if (isLink)
    return (
      <Link
        onClick={onClick}
        className={`cursor-pointer rounded-md transition-all duration-300 active:scale-95 ${className}`}
        to={link || ""}
      >
        {children}
      </Link>
    );
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-md transition-all duration-300 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
