const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-amber-500"></div>
    </div>
  );
};

export default LoadingSpinner;
