const Spinner = () => {
  return (
    <div className="relative">
      <div className="h-5 w-5 rounded-full border-t-4 border-b-4 border-gray-200"></div>
      <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
    </div>
  );
};

export default Spinner;
