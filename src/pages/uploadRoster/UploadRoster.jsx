import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useImportRosterMutation } from "../../redux/features/roster/rosterApi";
import { propertyMapping } from "../../utils/uploadRosterProperty";

const UploadRoster = () => {
  window.scrollTo(0, 0);
  const [fileData, setFileData] = useState(null);
  const fileInputRef = React.useRef(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  const [importRoster, { isLoading }] = useImportRosterMutation();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName]
      );

      setFileData(worksheet);
    };

    reader.readAsArrayBuffer(file);
  };

  const excelDateToJSDate = (serial) => {
    if (typeof serial === "number") {
      return new Date(Math.round((serial - 25569) * 86400 * 1000));
    }
    return serial;
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) return date; // Return as is if it's not a date

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const transformData = (data) => {
    return data.map((item) => {
      const transformedItem = {};
      for (const key in item) {
        if (propertyMapping[key?.toLowerCase()]) {
          transformedItem[propertyMapping[key?.toLocaleLowerCase()]] =
            item[key];
        }
      }
      return transformedItem;
    });
  };

  const toastId = "import-roster";

  const transformedData = fileData ? transformData(fileData) : [];

  const modifyData = transformedData.map((item) => {
    if (item?.dateBegin)
      item.dateBegin = formatDate(excelDateToJSDate(item?.dateBegin));
    if (item?.dateEnd)
      item.dateEnd = formatDate(excelDateToJSDate(item?.dateEnd));
    if (item?.zip) item.zip = item?.zip.toString();
    if (item?.phone) item.phone = item?.phone.toString();

    return item;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Uploading...", { id: toastId });

    const result = await importRoster(modifyData);
    if (result?.data?.success) {
      toast.success(result?.data?.message, { id: toastId });
      navigate("/manage-roster");
    } else if (result?.error) {
      toast.dismiss(toastId);
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message);
    }
    // Reset file input
    fileInputRef.current.value = null;
    setFileData(null);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/upload_template.xlsx";
    link.setAttribute("download", "upload_template.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full" data-aos="fade-up-right" data-aos-duration="500">
      {openErrorModal && (
        <ul className="my-5 relative p-2 pt-6 rounded-md border-2 border-red-500 shadow-lg list-disc list-inside">
          <button
            className="absolute top-1 right-1 z-10 px-3 py-1 text-xs rounded-md bg-gray-500 text-gray-100"
            onClick={() => {
              setOpenErrorModal(false);
              setErrorMessage([]);
            }}
          >
            Hide
          </button>
          {errorMessage?.length > 0 &&
            typeof errorMessage === "object" &&
            errorMessage.map((error, index) => (
              <li key={index} className="text-red-500 my-2">
                {error?.message}
              </li>
            ))}
          {errorMessage &&
          typeof errorMessage === "string" &&
          errorMessage.includes("|") ? (
            errorMessage.split("|")?.map((error, index) => (
              <li key={index} className="text-red-500 my-2">
                {error}
              </li>
            ))
          ) : (
            <li className="text-red-500 my-2">{errorMessage?.toString()}</li>
          )}
        </ul>
      )}
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className=" bg-blue-50 w-full max-w-xl p-4 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Upload a Roster
          </h1>
          <div className="flex flex-col items-end">
            <p className="text-xs mb-1">Download Template</p>
            <button
              onClick={handleDownload}
              className="bg-primary text-white px-5 py-[6px] text-lg rounded-md hover:opacity-90"
              title="Download upload roster template"
            >
              <FiDownload />
            </button>
          </div>
          <p className="text-xs">Upload a .xlsx file</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className={`my-4 text-sm inline-block ${
                fileData ? "text-green-500" : "text-red-500"
              } `}
              ref={fileInputRef}
              required
            />
            <div className="w-full mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-1 font-medium text-gray-100 bg-primary rounded-lg ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => {
          setOpenErrorModal(false);
          setErrorMessage("");
        }}
      /> */}
    </div>
  );
};

export default UploadRoster;
