/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { IoIosPrint } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { columnOptions } from "../../utils/utils";
import ExportButton from "../buttons/ExportButton";
import LoadingTableSkeleton from "../loading/LoadingTableSkeleton";
import DeleteConfirmModal from "../modal/DeleteConfirmationModal";
import TablePagination from "../pagination/TablePagination";
import ImagePreviewModal from "../modal/ImagePreviewModal";
import PrintTimeSheet from "../printTimeSheet/PrintTimeSheet";

const TimeSheetTable = ({
  filteredData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  isLoading,
  totalData,
  isFetching,
  deleteItem,
  setDeleteItem,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [receiptImage, setReceiptImage] = useState("");

  // Filter the header options to show only selected columns
  const customizeHeaderOptions = columnOptions;

  const handlePrint = () => {
    window.print();
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Show Items Per Page
  const startIndex = (currentPage - 1) * Number(itemsPerPage) + 1;
  const endIndex = Math.min(startIndex + Number(itemsPerPage) - 1, totalData);
  const adjustedStartIndex = startIndex > totalData ? totalData : startIndex;

  useEffect(() => {
    if (deleteItem && isDelete) {
      console.log(deleteItem, isDelete);
    }
  }, [isDelete, deleteItem]);

  if (isLoading) {
    return (
      <div className="mt-10 md:mt-0">
        <LoadingTableSkeleton />
      </div>
    );
  }

  return (
    <>
      {filteredData?.length > 0 ? (
        <div className="relative">
          <div
            className={`text-2xl absolute opacity-100 z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isFetching ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-center items-center gap-2 my-10">
              <FaSpinner className="animate-spin text-xl text-primary" />{" "}
              <p className="text-base font-semibold text-">Loading...</p>
            </div>
          </div>
          <div
            className={`view-ros-con ${
              isFetching ? "opacity-50 bg-gray-200" : null
            }`}
          >
            <div className="flex justify-between items-center mb-4 md:mb-2 gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-1 border rounded-md px-2 py-[2px] bg-gray-200">
                  <p className="text-xs font-[500]">Show Row</p>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className=" p-[2px] text-xs focus:outline-none border rounded-md border-blue-300 bg-slate-50"
                  >
                    {[10, 25, 50, 100, 250, 500, 1000]?.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <ExportButton
                  headerData={customizeHeaderOptions}
                  data={filteredData}
                />
                <button
                  onClick={() => handlePrint()}
                  title={"Print"}
                  className={`bg-primary text-white px-5 py-[6px] text-lg rounded-md hover:opacity-90`}
                >
                  <IoIosPrint />
                </button>
              </div>
            </div>

            <div className="overflow-auto rounded-lg border border-gray-400">
              <table className="min-w-full bg-white text-tColor">
                <thead className="bg-primary text-gray-200">
                  <tr>
                    <th className="py-2 border-r border-b border-gray-400 text-xs md:text-sm px-1 last:border-r-0">
                      No
                    </th>
                    {customizeHeaderOptions?.map((item, i) => (
                      <th
                        key={i}
                        className="py-2 border-r border-b border-gray-400 text-xs md:text-sm px-1 last:border-r-0 text-nowrap"
                      >
                        {item.label}
                      </th>
                    ))}
                    <th className="py-2 border-b border-gray-400 text-xs md:text-sm px-1 last:border-r-0 min-w-[100px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((item, i) => (
                    <tr
                      key={i}
                      className={`border-gray-400 hover:bg-gray-200 ${
                        i % 2 === 0 ? "bg-gray-100" : ""
                      } ${
                        i === filteredData.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                    >
                      {/* Display the index */}
                      <td className="py-2 text-center border-gray-400 text-xs md:text-sm px-1 border-r last:border-r-0">
                        {i + 1 + (currentPage - 1) * itemsPerPage}
                      </td>

                      {/* Dynamically render object properties */}
                      {Object.keys(item)?.map((key) => {
                        const exists = customizeHeaderOptions.some(
                          (header) => header.value === key
                        );

                        return (
                          key !== "id" &&
                          exists && (
                            <td
                              key={key}
                              onClick={() => {
                                if (key !== "tripReceipt") {
                                  return;
                                }
                                if (item[key]) {
                                  setImageModalOpen(true);
                                  setReceiptImage(item[key]);
                                }
                              }}
                              // i want to use 2 condition in the class like key === tripReceipt && item[key] ? "cursor-pointer" : ""
                              className={`py-2 text-left border-gray-400 text-xs md:text-sm px-1 border-r text-nowrap last:border-r-0 ${
                                key === "tripReceipt" && item[key]
                                  ? "cursor-pointer"
                                  : ""
                              }`}
                            >
                              {key === "tripReceipt" && item[key] ? (
                                <p className="text-blue-500 px-2">
                                  View Receipt
                                </p>
                              ) : (
                                item[key]
                              )}
                            </td>
                          )
                        );
                      })}
                      <td className="flex justify-evenly items-center py-2 text-left border-gray-400 text-xs md:text-sm px-1 border-r last:border-r-0">
                        <Link
                          to={`/update-trip/${item.id}`}
                          state={{ data: item }}
                          className="text-blue-500 text-lg mx-1"
                        >
                          <HiPencilAlt />
                        </Link>
                        <button
                          // disabled={disabledState}
                          onClick={() => {
                            setDeleteItem({
                              id: item.id,
                              ...(item?.name ? { name: item?.name } : {}),
                            });
                            setIsModalOpen(true);
                          }}
                          className="text-red-500 text-lg mx-1"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 justify-between mt-2">
              <div>
                <p className="text-xs font-[500]">
                  Show {adjustedStartIndex} - {endIndex} of {totalData} results
                </p>
              </div>

              {totalData <= itemsPerPage ? null : (
                <TablePagination
                  totalPages={Math.ceil(totalData / itemsPerPage)}
                  currentPage={currentPage}
                  handlePageClick={handlePageClick}
                />
              )}
            </div>
            <DeleteConfirmModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              itemName={deleteItem?.name}
              setIsDelete={setIsDelete}
            />
          </div>
        </div>
      ) : null}

      {!isLoading && filteredData?.length === 0 ? (
        <p className="mt-2 text-xl text-center">No data found.</p>
      ) : null}

      <div className="-mt-[200px]">
        <PrintTimeSheet
          headerData={customizeHeaderOptions}
          rowData={filteredData}
        />
      </div>

      <ImagePreviewModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        image={receiptImage}
      />
    </>
  );
};

export default TimeSheetTable;
