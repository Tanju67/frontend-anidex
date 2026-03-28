import { useState } from "react";

type ImagePlaceholderProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export default function ImagePlaceholder({
  src,
  alt,
  className = "",
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-400 font-bold text-white ${className}`}
      >
        {"No Image"}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
