/* eslint-disable react/prop-types */
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";

const ExportButton = ({
  headerData,
  data,
  fileName = "roster.xlsx",
  isLoggedIn,
}) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      console.warn("No data provided for export.");
      return;
    }

    // Efficiently extract export data from headerData
    const exportData = data.map((item) => {
      const filteredItem = {};
      headerData.forEach((header) => {
        filteredItem[header.value === "weekend" ? "GB#" : header.value] =
          item[header.value === "weekend" ? "weekendNo" : header.value];
      });
      return filteredItem;
    });

    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Roster");

    // Create and download the Excel file
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!isLoggedIn}
      className={`bg-primary text-white px-5 py-[6px] text-lg rounded-md mr-2 
    ${isLoggedIn ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"}`}
      title={!isLoggedIn ? "Login to export roster" : "Export"}
    >
      <FiDownload />
    </button>
  );
};

export default ExportButton;
