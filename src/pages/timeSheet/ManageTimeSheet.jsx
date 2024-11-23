/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { FaPlus, FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { testData } from "../../assets/fakeData";
import FilterModal from "../../components/modal/FilterModal";
import { useGetViewRosterQuery } from "../../redux/features/roster/rosterApi";
import { searchSuggestions } from "../../utils/searchSuggestions";
import TimeSheetTable from "../../components/timeSheetTable/TimeSheetTable";
import { Link } from "react-router-dom";

const ManageTimeSheet = () => {
  // window.scrollTo(0, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState([1]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [deleteItem, setDeleteItem] = useState({});

  const searchParams = {
    ...(searchTerm ? { searchTerm } : {}),
    sortOrder,
    page: currentPage,
    limit: itemsPerPage,
  };
  const {
    data: rosterData,
    isLoading,
    isFetching,
  } = useGetViewRosterQuery(searchParams);

  // const filteredData = rosterData?.data || [];
  const filteredData = testData || [];

  // const handleClearFilters = () => {
  //   setSearchTerm("");
  //   setCurrentPage(1);
  //   setSelectedDate("");
  //   setSortOrder("asc");
  // };

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilter = () => {
    setIsModalOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setOpenSuggestion(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.search.value);
  };

  // Handle clicking outside the suggestion box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setOpenSuggestion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const sugData = searchSuggestions(filteredData, searchTerm);
    setSuggestions(sugData);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const showDate = selectedDate && format(selectedDate, "dd/MM/yyyy");
  // const showDate = "12/10/2024";

  return (
    <>
      <div
        className="w-full mx-auto mb-40"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div>
          <h1 className="text-lg font-semibold text-tColor mb-2 text-center md:text-left">
            Manage Time Sheet
          </h1>

          <div className="mb-4 bg-slate-100 shadow-lg p-2 md:p-6 rounded-lg">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-2">
              <div className="flex flex-col md:flex-row md:items-end w-full text-tColor gap-2">
                <div className="relative w-full">
                  <p className="text-xs font-semibold mb-1">
                    What are you looking for?
                  </p>
                  <div
                    onFocus={() => setOpenSuggestion(true)}
                    ref={inputRef}
                    className="flex justify-between w-full"
                  >
                    {openSuggestion &&
                      searchTerm &&
                      suggestions?.length > 0 && (
                        <div
                          className="w-[337px] bg-blue-50 shadow-2xl absolute top-14 left-0 z-10 p-2 rounded-md border border-gray-300"
                          ref={suggestionRef}
                        >
                          {suggestions?.slice(0, 10)?.map((item, i) => (
                            <p
                              key={i}
                              className="text-sm py-1 cursor-pointer hover:bg-blue-100"
                              onClick={() => handleSuggestionClick(item)}
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      )}
                    <form
                      onSubmit={(e) => handleSubmit(e)}
                      className="flex items-center gap-2 w-full md:w-1/2"
                    >
                      <div className="relative w-[80%] md:w-full">
                        <FaSearch className="text-sm text-tColor absolute z-0 top-[8px] left-3" />
                        <MdCancel
                          onClick={() => setSearchTerm("")}
                          className={`text-sm cursor-pointer absolute z-0 top-[8px] right-2 ${
                            searchTerm ? "block" : "hidden"
                          }`}
                        />

                        <input
                          type="text"
                          name="search"
                          placeholder="Search"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setOpenSuggestion(true);
                          }}
                          className="border py-[4px] pl-8 pr-2 w-full flex-1 focus:outline-blue-500 border-blue-500 text-sm rounded-md"
                        />
                      </div>
                      <button onClick={handleFilterClick} title="Filter">
                        <FaRegCalendarAlt className="text-2xl text-primary hover:opacity-90" />
                      </button>
                    </form>
                    <div>
                      <Link
                        to="/new-trip"
                        className="bg-primary text-gray-100 text-sm font-semibold px-4 py-[5px] rounded-md hover:opacity-90 text-nowrap hidden md:flex items-center justify-center"
                      >
                        <FaPlus className="mr-1" /> New Trip
                      </Link>
                      <Link
                        to="/new-trip"
                        className="bg-primary text-gray-100 text-sm font-semibold px-4 py-[5px] rounded-md hover:opacity-90 text-nowrap md:hidden flex items-center justify-center"
                      >
                        <FaPlus className="mr-1" /> Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 flex-wrap items-center mt-4 text-tColor">
                <p
                  className={`text-xs font-semibold ${
                    !selectedDate ? "hidden" : "block"
                  }`}
                >
                  Filtered By:
                </p>
                {selectedDate && (
                  <p className="text-xs px-2 py-1 bg-blue-100 rounded-md flex items-center gap-1 break-all">
                    {showDate}
                    <MdCancel
                      onClick={() => setSelectedDate("")}
                      className="text-sm cursor-pointer"
                    />
                  </p>
                )}
                {searchTerm && (
                  <p className="text-xs px-2 py-1 bg-blue-100 rounded-md flex items-center gap-1 break-all">
                    {searchTerm}
                    <MdCancel
                      onClick={() => setSearchTerm("")}
                      className="text-sm cursor-pointer"
                    />
                  </p>
                )}
              </div>
            </div>
          </div>

          <TimeSheetTable
            filteredData={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            isLoading={isLoading}
            // totalData={rosterData?.meta?.total}
            totalData={testData.length}
            isFetching={isFetching}
            deleteItem={deleteItem}
            setDeleteItem={setDeleteItem}
          />
        </div>
      </div>
      {isModalOpen && (
        <FilterModal
          handleCloseModal={handleCloseModal}
          handleApplyFilter={handleApplyFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
};

export default ManageTimeSheet;
