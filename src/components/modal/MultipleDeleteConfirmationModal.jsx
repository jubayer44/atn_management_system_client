/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const MultipleDeleteConfirmModal = ({
  isOpen,
  onClose,
  setIsDelete,
  item,
  disabledState,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const isInputValid = inputValue === "delete users";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 text-gray-600 scale-0 transition-all duration-300 min-h-screen ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div className="absolute inset-0 bg-gray-600 opacity-50 blur-sm"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg -mt-36 z-10 mx-5">
        <div className="text-center">
          <div className="flex justify-center">
            <FaTrash className="text-red-600 text-4xl mb-4" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Are you sure you want to delete {item} users?
          </h2>
          {item >= 5 && (
            <div>
              <p className="text-sm text-tColor font-semibold text-left">
                Type &apos;delete users&apos; to confirm
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="delete users"
                className="w-full px-4 py-1 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 mb-4"
              />
            </div>
          )}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setIsDelete(false);
                onClose();
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded text-sm"
            >
              Cancel
            </button>
            {item < 5 && (
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
            )}

            {item >= 5 && (
              <button
                disabled={!isInputValid || disabledState}
                onClick={() => {
                  setIsDelete(true);
                  handleClearInput();
                }}
                className={`bg-red-600 text-white py-1 px-4 rounded text-sm ${
                  !isInputValid || disabledState
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                }`}
              >
                {disabledState ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleDeleteConfirmModal;
