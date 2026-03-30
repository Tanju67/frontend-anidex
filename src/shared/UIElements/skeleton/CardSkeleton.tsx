function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-40 w-full rounded-xl bg-white/10" />
      <div className="mb-1 h-4 w-3/4 rounded bg-white/10" />
      <div className="h-4 w-1/2 rounded bg-white/10" />
    </div>
  );
}

export default CardSkeleton;
