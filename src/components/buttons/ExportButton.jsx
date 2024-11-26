/* eslint-disable react/prop-types */
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import {
  exportColumnOptions,
  totalHourDurationSum,
  totalPaymentSum,
} from "../../utils/utils";

const ExportButton = ({ data, fileName = "time-sheet.xlsx" }) => {
  const totalPayment = totalPaymentSum(data);
  const totalDurationTime = totalHourDurationSum(data);
  const handleExport = () => {
    if (!data || data.length === 0) {
      console.warn("No data provided for export.");
      return;
    }

    // Efficiently extract export data from exportColumnOptions
    const exportData = data.map((item, i) => {
      const filteredItem = {};
      exportColumnOptions.forEach((header) => {
        // filter headers
        if (header.value === "totalHours" && i === 0) {
          filteredItem[header.label] = totalDurationTime;
          return;
        }

        if (header.value === "totalPayment" && i === 0) {
          filteredItem[header.label] = totalPayment;
          return;
        }

        filteredItem[header.label] = item[header.value];
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
