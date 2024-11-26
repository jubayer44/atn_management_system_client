/* eslint-disable react/prop-types */

import { FiDownload } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { toast } from "sonner";

const ImagePreviewModal = ({ isOpen, onClose, image }) => {
  if (!image) {
    return null;
  }

  // Function to handle image download directly using Blob
  const handleDownload = () => {
    // Fetch the image data as a Blob
    fetch(image)
      .then((response) => response.blob()) // Convert the image URL into a Blob object
      .then((blob) => {
        // Create an Object URL for the Blob (this doesn't cause a page redirect)
        const url = window.URL.createObjectURL(blob);

        // Create a temporary <a> element to simulate the download
        const link = document.createElement("a");
        link.href = url;
        link.download = image.split("/").pop(); // Extract the image file name from the URL
        document.body.appendChild(link); // Append the link element to the document body
        link.click(); // Trigger the download by simulating a click
        document.body.removeChild(link); // Clean up by removing the link element from the DOM

        // Release the Object URL after download to free memory
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the image:", error);
        toast.error("Error downloading the image");
      });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 text-gray-600 scale-0 transition-all duration-300 min-h-screen ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div className="absolute inset-0 bg-gray-600 opacity-50 blur-sm"></div>
      <div className="relative bg-white p-2 lg:p-6 rounded-lg shadow-sm z-10 mx-5 md:min-w-96 md:max-w-[80%] max-h-[90vh]">
        <p className="absolute top-2 right-2 z-10">
          <GiCancel
            className="text-red-500 text-2xl font-bold cursor-pointer"
            onClick={onClose}
          />
        </p>
        <div className="flex justify-center items-center">
          <img className="rounded-lg w-full max-h-[60vh]" src={image} alt="" />
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleDownload}
            className="bg-primary text-white px-5 py-[6px] text-lg rounded-md hover:opacity-90"
            title="Download Image"
          >
            <FiDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
