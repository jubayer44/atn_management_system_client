import { useEffect, useRef, useState } from "react";
import { MdAdd, MdCancel } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ManageRosterTable from "../../components/rosterTable/ManageRosterTable";
import { useDispatch, useSelector } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const ManageRoster = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const { selectedTable } = useSelector((state) => state.roster);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const dispatch = useDispatch();
  const redirected = useLocation()?.state;

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setOpenSuggestion(false);
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
    if (!redirected) {
      dispatch(setTable("Roster"));
    }
  }, [redirected, dispatch]);

  return (
    <div
      className="w-full mx-auto mb-40"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div>
        <h1 className="text-lg font-semibold text-tColor mb-2 text-center md:text-left">
          Manage Roster
        </h1>

        <div className="mb-4 bg-slate-100 shadow-lg p-2 md:p-6 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-2">
            <div className="flex flex-col md:flex-row md:items-end w-full text-tColor gap-2">
              <div className="relative w-full">
                <p className="text-xs font-semibold mb-1">
                  What are you looking for?
                </p>
                <div onFocus={() => setOpenSuggestion(true)} ref={inputRef}>
                  {openSuggestion && searchTerm && suggestions?.length > 0 && (
                    <div
                      className="w-[337px] bg-blue-50 shadow-2xl absolute top-14 left-0 z-10 p-2 rounded-md border border-gray-300"
                      ref={suggestionRef}
                    >
                      {suggestions?.slice(0, 10).map((item, i) => (
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
                  <div className="flex items-center gap-2">
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
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          // setOpenSuggestion(true);
                        }}
                        className="border py-[4px] pl-8 pr-2 w-full flex-1 focus:outline-blue-500 border-blue-500 text-sm rounded-md"
                      />
                    </div>
                    <button className="bg-primary text-gray-100 p-[7px] rounded-md w-[20%] flex justify-center items-center md:hidden hover:opacity-90">
                      <FaSearch className="md:hidden" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-full gap-2 items-end">
                <div>
                  <p className="text-xs font-semibold mb-1 w-full md:text-nowrap">
                    Select Table
                  </p>
                  <select
                    value={selectedTable}
                    onChange={(e) => dispatch(setTable(e.target.value))}
                    name="category"
                    className="border p-[2px] md:p-[3%] rounded-md text-xs md:text-sm focus:outline-none border-blue-500 font-semibold"
                  >
                    {["Individual", "Weekend", "Role", "Roster"].map(
                      (item, i) => (
                        <option
                          key={i}
                          value={item}
                          className="text-gray-500 text-xs md:text-sm"
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <Link
                  to={
                    selectedTable === "Roster"
                      ? "/add-roster"
                      : `/create-${selectedTable.toLocaleLowerCase()}`
                  }
                  className={`bg-primary text-gray-100 text-xs font-semibold px-2 py-[3px] rounded-md hover:opacity-90 flex items-center md:hidden`}
                >
                  <MdAdd className="text-xl text-gray-100 font-bold" />
                  {selectedTable === "Roster"
                    ? `Add a Role`
                    : `Create a  ${selectedTable}`}
                </Link>
              </div>

              <div className="hidden md:flex gap-3 min-w-[180px] justify-center">
                <div>
                  <Link
                    to={
                      selectedTable === "Roster"
                        ? "/add-roster"
                        : `/create-${selectedTable.toLocaleLowerCase()}`
                    }
                    className={`bg-primary text-gray-100 text-sm font-semibold px-3 py-[5px] rounded-md hover:opacity-90 items-center flex w-full`}
                  >
                    <MdAdd className="text-xl text-white font-bold" />
                    <span className="text-nowrap">
                      {selectedTable === "Roster"
                        ? `Add a Role`
                        : `Create a  ${selectedTable}`}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ManageRosterTable
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTable={selectedTable}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageRoster;
