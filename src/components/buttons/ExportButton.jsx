/* eslint-disable react/prop-types */
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";

const ExportButton = ({ headerData, data, fileName = "time-sheet.xlsx" }) => {
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
      className={`bg-primary text-white px-5 py-[6px] text-lg rounded-md mr-2 hover:opacity-90`}
      title="Export"
    >
      <FiDownload />
    </button>
  );
};

export default ExportButton;
