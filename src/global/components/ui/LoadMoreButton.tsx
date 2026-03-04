interface Props {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
  label: string;
}

const LoadMoreButton = ({ onClick, loading, hasMore, label }: Props) => {
  if (!hasMore)
    return (
      <p className="text-center text-xs text-gray-400 py-2">
        {" You have reached the end"}
      </p>
    );

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-2.5 text-sm font-medium text-orange-500 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          {"Loading..."}
        </span>
      ) : (
        `Load More ${label}`
      )}
    </button>
  );
};

export default LoadMoreButton;
