/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  setIsDelete,
  itemName,
  disabledState,
}) => {
  // if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 text-gray-600 scale-0 transition-all duration-300 min-h-screen ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div className="absolute inset-0 bg-gray-600 opacity-50 blur-sm"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-sm z-10 mx-5">
        <div className="text-center">
          <div className="flex justify-center">
            <FaTrash className="text-red-600 text-4xl mb-4" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold mb-8">
            Are you sure you want to delete &apos;{itemName}&apos; ?
          </h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                onClose();
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded text-sm"
            >
              Cancel
            </button>
            <button
              disabled={disabledState}
              onClick={() => setIsDelete(true)}
              className={`bg-red-600 text-white py-1 px-4 rounded text-sm ${
                disabledState
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700"
              }`}
            >
              {disabledState ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
