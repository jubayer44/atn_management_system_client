/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

const FilterModal = ({
  handleCloseModal,
  handleApplyFilter,
  sortOrder,
  setSortOrder,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 w-full">
      <div className="bg-white p-4 rounded shadow-lg relative w-[300px]">
        <h2 className="text-lg font-semibold text-tColor my-4 text-center">
          Filter With Date
        </h2>
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <MdCancel size={20} />
        </button>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-xs font-semibold mb-2"
          >
            Start Date
          </label>
          <div className="relative">
            <DatePicker
              placeholderText="dd-mm-yyyy"
              onChange={(e) => setStartDate(e?.toISOString())}
              selected={startDate}
              dateFormat="dd-MM-yyyy"
              className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
              // ${
              //   errors.dateBegin ? "border-red-500" : ""
              // }
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <AiOutlineCalendar className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-xs font-semibold mb-2">
            End Date (Optional)
          </label>
          <div className="relative">
            <DatePicker
              placeholderText="dd-mm-yyyy"
              onChange={(e) => setEndDate(e?.toISOString())}
              selected={endDate}
              dateFormat="dd-MM-yyyy"
              className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
              // ${
              //   errors.dateBegin ? "border-red-500" : ""
              // }
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <AiOutlineCalendar className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-2">Sort Order</label>
          <div className="flex justify-around">
            <div className="flex items-center gap-1">
              <label className="text-xs cursor-pointer" htmlFor="asc">
                Asc
              </label>
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={sortOrder === "asc"}
                id="asc"
                onChange={() => setSortOrder("asc")}
              />
            </div>
            <div className="flex items-center gap-1">
              <label className="text-xs cursor-pointer" htmlFor="desc">
                Desc
              </label>
              <input
                type="checkbox"
                checked={sortOrder === "desc"}
                id="desc"
                className="cursor-pointer"
                onChange={() => setSortOrder("desc")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleApplyFilter}
            className="text-gray-100 bg-primary hover:opacity-90 px-4 py-1 rounded text-sm"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
