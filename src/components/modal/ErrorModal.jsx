/* eslint-disable react/prop-types */
const ErrorModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-md">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-2 md:w-1/3">
        <h2 className="text-sm font-bold text-red-600 text-center">Error</h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-1 text-xs rounded hover:bg-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
