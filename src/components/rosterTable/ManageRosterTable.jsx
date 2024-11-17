/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DeleteConfirmModal from "../modal/DeleteConfirmationModal";
import TablePagination from "../pagination/TablePagination";
import { searchSuggestions } from "../../utils/searchSuggestions";
import {
  useDeleteIndividualMutation,
  useGetIndividualsQuery,
} from "../../redux/features/individual/individualApi";
import {
  useDeleteWeekendMutation,
  useGetWeekendsQuery,
} from "../../redux/features/weekend/weekendApi";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../redux/features/role/roleApi";
import {
  useDeleteRosterMutation,
  useGetManageRosterQuery,
} from "../../redux/features/roster/rosterApi";
import {
  individualsColumnsOption,
  weekendsColumnsOption,
  rolesColumnsOptions,
  columnOptionsForManage,
} from "../../utils/utils";
import ErrorModal from "../modal/ErrorModal";
import LoadingTableSkeleton from "../loading/LoadingTableSkeleton";
import { FaSpinner, FaTrash } from "react-icons/fa";
import TablesDeleteModal from "../modal/TablesDeleteModal";
import { getUserInfo } from "../../services/authServices";
import { userRole } from "../../utils/constant";

const ManageRosterTable = ({
  setSuggestions,
  searchTerm,
  setSearchTerm,
  selectedTable,
  currentPage,
  setCurrentPage,
}) => {
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState(weekendsColumnsOption);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenTableDeleteModal, setIsOpenTableDeleteModal] = useState(false);
  const navigate = useNavigate();

  const role = getUserInfo()?.role;
  const isSuperAdmin = role.toLowerCase() === userRole.superAdmin;
  const searchParams = {
    ...(searchTerm ? { searchTerm } : {}),
    sortOrder: "desc",
    page: currentPage,
    limit: itemsPerPage,
  };

  const {
    data: individualsData,
    isLoading: isLoadingIndividuals,
    isFetching: isFetchingIndividuals,
  } = useGetIndividualsQuery(searchParams, {
    skip: selectedTable === "Roster",
  });
  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
  } = useGetRolesQuery(searchParams, {
    skip: selectedTable === "Roster",
  });
  const {
    data: weekendsData,
    isLoading: isLoadingWeekends,
    isFetching: isFetchingWeekends,
  } = useGetWeekendsQuery(
    { ...searchParams, sortBy: "dateBegin" },
    {
      skip: selectedTable === "Roster",
    }
  );
  const {
    data: rostersData,
    isLoading: isLoadingRosters,
    isFetching: isFetchingRosters,
  } = useGetManageRosterQuery(searchParams);

  // Delete Mutations
  const [deleteWeekend, { isLoading: isLoadingDeleteWeekend }] =
    useDeleteWeekendMutation();
  const [deleteRoster, { isLoading: isLoadingDeleteRoster }] =
    useDeleteRosterMutation();
  const [deleteIndividual, { isLoading: isLoadingDeleteIndividual }] =
    useDeleteIndividualMutation();
  const [deleteRole, { isLoading: isLoadingDeleteRole }] =
    useDeleteRoleMutation();

  const disabledState =
    isLoadingDeleteWeekend ||
    isLoadingDeleteRoster ||
    isLoadingDeleteIndividual ||
    isLoadingDeleteRole;

  const fetchingState =
    isFetchingWeekends ||
    isFetchingRosters ||
    isFetchingIndividuals ||
    isFetchingRoles;

  const toastId = "delete-confirmation";

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let tableTitle = "";

  if (selectedTable === "Roster") {
    tableTitle = "Rosters";
  } else if (selectedTable === "Individual") {
    tableTitle = "Individuals";
  } else if (selectedTable === "Weekend") {
    tableTitle = "Weekends";
  } else if (selectedTable === "Role") {
    tableTitle = "Roles";
  }

  // Show Items Per Page
  const startIndex = (currentPage - 1) * Number(itemsPerPage) + 1;
  const endIndex = Math.min(startIndex + Number(itemsPerPage) - 1, totalData);
  const adjustedStartIndex = startIndex > totalData ? totalData : startIndex;

  useEffect(() => {
    if (isDelete) {
      let result;
      toast.loading("Deleting...", { id: toastId });
      const handleDelete = async () => {
        if (deleteItem?.table === "Roster") {
          result = await deleteRoster(deleteItem?.id);
        } else if (deleteItem?.table === "Individual") {
          result = await deleteIndividual(deleteItem?.id);
        } else if (deleteItem?.table === "Weekend") {
          result = await deleteWeekend(deleteItem?.id);
        } else if (deleteItem?.table === "Role") {
          result = await deleteRole(deleteItem?.id);
        }
        if (result?.data?.success) {
          toast.success(result?.data?.message, { id: toastId });
          setIsModalOpen(false);
          setDeleteItem({});
          setIsDelete(false);
          navigate("/manage-roster");
        } else if (result?.error) {
          setOpenErrorModal(true);
          setErrorMessage(result?.error?.data?.message || "An error occurred");
          setIsModalOpen(false);
          setDeleteItem({});
          setIsDelete(false);
          toast.dismiss(toastId);
        }
      };

      handleDelete();
    }
  }, [isDelete, deleteItem]);

  useEffect(() => {
    if (selectedTable === "Roster") {
      setTableData(rostersData?.data);
      setTotalData(rostersData?.meta?.total);
      setTableHeader(columnOptionsForManage);
    } else if (selectedTable === "Individual") {
      setTableData(individualsData?.data);
      setTotalData(individualsData?.meta?.total);
      setTableHeader(individualsColumnsOption);
    } else if (selectedTable === "Weekend") {
      setTableData(weekendsData?.data);
      setTotalData(weekendsData?.meta?.total);
      setTableHeader(weekendsColumnsOption);
    } else if (selectedTable === "Role") {
      setTableData(rolesData?.data);
      setTotalData(rolesData?.meta?.total);
      setTableHeader(rolesColumnsOptions);
    }
  }, [selectedTable, individualsData, weekendsData, rolesData, rostersData]);

  useEffect(() => {
    const sugData = searchSuggestions(tableData, searchTerm);
    setSuggestions(sugData);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
    setCurrentPage(1);
    setItemsPerPage(10);
    setDeleteItem({});
  }, [selectedTable]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const loadingState =
    isLoadingIndividuals ||
    isLoadingWeekends ||
    isLoadingRoles ||
    isLoadingRosters;

  if (loadingState) {
    return <LoadingTableSkeleton />;
  }

  return (
    <>
      {tableData?.length > 0 ? (
        <div className="relative">
          <div
            className={`text-2xl absolute opacity-100 z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              fetchingState ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-center items-center gap-2 my-10">
              <FaSpinner className="animate-spin text-xl text-primary" />{" "}
              <p className="text-base font-semibold text-">Loading...</p>
            </div>
          </div>
          <div
            className={`overflow-hidden view-ros-con ${
              fetchingState ? "opacity-50 bg-gray-200" : null
            }`}
          >
            <div className="flex justify-between items-center mb-4 md:mb-2 gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 md:flex-1">
                <div className="flex items-center gap-1 border rounded-md px-2 py-[2px] bg-gray-200">
                  <p className="text-xs font-[500]">Show Rows</p>
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
              <div className="flex-1 md:text-center">
                <h4 className="text-sm font-semibold text-tColor">
                  {tableTitle} Table
                </h4>
              </div>
              {isSuperAdmin ? (
                <>
                  <div className="flex-1 hidden md:block">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsOpenTableDeleteModal(true)}
                        className="text-white bg-red-500 px-2 py-1 text-xs rounded-md"
                      >
                        Delete Tables
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpenTableDeleteModal(true)}
                    className="md:hidden flex items-center gap-2 text-white bg-red-500 px-2 py-1 text-xs rounded-md"
                  >
                    <FaTrash className="text-white" /> <span>Table</span>
                  </button>
                </>
              ) : (
                <div className="flex-1 hidden md:block"></div>
              )}
            </div>

            <div className="overflow-auto rounded-lg border border-gray-400">
              <table className="min-w-full bg-white text-tColor">
                <thead className="bg-primary text-gray-200">
                  <tr>
                    <th className="py-2 border-r border-b border-gray-400 text-xs md:text-sm px-1 last:border-r-0">
                      No
                    </th>
                    {tableHeader?.map((item, i) => (
                      <th
                        key={i}
                        className="py-2 border-r border-b border-gray-400 text-xs md:text-sm px-1 last:border-r-0"
                      >
                        {item.label === "Weekend" ? "GB#" : item.label}
                      </th>
                    ))}

                    <th className="py-2 border-b border-gray-400 text-xs md:text-sm px-1 last:border-r-0 min-w-[100px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((item, i) => (
                    <tr
                      key={i}
                      className={`border-gray-400 hover:bg-gray-200 ${
                        i % 2 === 0 ? "bg-gray-100" : ""
                      } ${
                        i === tableData.length - 1 ? "border-b-0" : "border-b"
                      }`}
                    >
                      {/* Display the index */}
                      <td className="py-2 text-center border-gray-400 text-xs md:text-sm px-1 border-r last:border-r-0">
                        {i + 1 + (currentPage - 1) * itemsPerPage}
                      </td>

                      {/* Dynamically render object properties */}
                      {Object?.keys(item)?.map((key) => {
                        const exists = tableHeader?.some(
                          (header) =>
                            (header?.value === "weekend"
                              ? "weekendNo"
                              : header?.value) === key
                        );

                        return (
                          key !== "id" &&
                          exists && (
                            <td
                              key={key}
                              className={`p-2 text-left border-gray-400 text-xs md:text-sm border-r last:border-r-0 ${
                                key === "notes" || key === "description"
                                  ? "text-wrap"
                                  : "text-nowrap"
                              }`}
                              style={
                                key === "notes" || key === "description"
                                  ? {
                                      maxWidth: "250px",
                                      overflowX: "auto",
                                      whiteSpace: "nowrap", // Prevent text from wrapping
                                    }
                                  : {}
                              }
                            >
                              {item[key]}
                            </td>
                          )
                        );
                      })}

                      {/* Conditionally render the manage roster actions */}

                      <td className="flex justify-evenly items-center py-2 text-left border-gray-400 text-xs md:text-sm px-1 border-r last:border-r-0">
                        <Link
                          to={`/update-${selectedTable.toLowerCase()}/${
                            item.id
                          }`}
                          state={{ data: item }}
                          className="text-blue-500 text-lg mx-1"
                        >
                          <HiPencilAlt />
                        </Link>
                        <button
                          disabled={disabledState}
                          onClick={() => {
                            setDeleteItem({
                              table: selectedTable,
                              id: item.id,
                              ...(item?.name ? { name: item?.name } : {}),
                              ...(selectedTable === "Weekend" && item?.weekendNo
                                ? { name: item?.weekendNo }
                                : {}),
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
              setIsDelete={setIsDelete}
              itemName={
                deleteItem?.name || deleteItem?.weekendNo || "This Item"
              }
              disabledState={disabledState}
            />
          </div>
        </div>
      ) : null}

      {!loadingState && tableData?.length === 0 && (
        <p className="mt-2 text-xl text-center">No data found.</p>
      )}
      <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => setOpenErrorModal(false)}
      />
      <TablesDeleteModal
        isOpen={isOpenTableDeleteModal}
        onClose={setIsOpenTableDeleteModal}
      />
    </>
  );
};

export default ManageRosterTable;
