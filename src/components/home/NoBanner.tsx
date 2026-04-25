function NoBanner() {
  return (
    <div className="bg-main/5 border-main/20 flex h-100 w-full flex-col items-center justify-center rounded-3xl border border-dashed">
      <p className="text-sm opacity-60">
        Featured content is currently unavailable
      </p>
      <button
        onClick={() => window.location.reload()}
        className="text-main mt-4 text-xs font-bold tracking-widest uppercase hover:underline"
      >
        Try Refreshing
      </button>
    </div>
  );
}

export default NoBanner;
