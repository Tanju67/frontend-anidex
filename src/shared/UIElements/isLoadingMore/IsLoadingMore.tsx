function IsLoadingMore({ loadMore }: { loadMore: () => void }) {
  return (
    <button
      onClick={() => loadMore()}
      className="text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:text-white"
    >
      Server Timeout - Click to Retry
    </button>
  );
}

export default IsLoadingMore;
