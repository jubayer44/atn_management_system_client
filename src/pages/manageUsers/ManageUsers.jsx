import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaSpinner } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import CreateUserModal from "../../components/modal/CreateUserModal";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmationModal";
import ErrorModal from "../../components/modal/ErrorModal";
import UpdateUserModal from "../../components/modal/UpdateUserModal";
import TablePagination from "../../components/pagination/TablePagination";
import {
  useDeleteMultipleUsersMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import ManageUsersTable from "./ManageUsersTable";
import MultipleDeleteConfirmModal from "../../components/modal/MultipleDeleteConfirmationModal";
import { userRole } from "../../utils/constant";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [updateItem, setUpdateItem] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [item, setItem] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [openMultipleDeleteModal, setOpenMultipleDeleteModal] = useState(false);
  const itemsPerPage = 5;

  const searchPerm = {
    ...(searchTerm ? { searchTerm } : {}),
    page: page,
    limit: itemsPerPage,
  };

  const {
    data: userData,
    isLoading: isLoadingUsers,
    isFetching,
  } = useGetAllUsersQuery(searchPerm);
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const [deleteMultipleUsers, { isLoading: isLoadingMultipleDelete }] =
    useDeleteMultipleUsersMutation();

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  // Show Items Per Page
  const startIndex = (page - 1) * Number(itemsPerPage) + 1;
  const endIndex = Math.min(
    startIndex + Number(itemsPerPage) - 1,
    userData?.meta?.total
  );
  const adjustedStartIndex =
    startIndex > userData?.meta?.total ? userData?.meta?.total : startIndex;

  const changeStatusId = "change-status";

  const toggleDialog = (id) => {
    setItem(id);
    setIsDialogOpen(!isDialogOpen);
  };

  const handleStatusChange = async (newStatus) => {
    toast.loading("Updating Status...", { id: changeStatusId });
    setIsDialogOpen(false);

    const res = await updateUser({
      id: item,
      data: {
        status: newStatus.toUpperCase(),
      },
    });
    if (res?.data?.success) {
      toast.success("Status updated successfully", { id: changeStatusId });
    }
    if (res?.error) {
      toast.error(res?.error?.data?.message || "Something went wrong", {
        id: changeStatusId,
      });
    }
  };

  const handleClickOutside = (event) => {
    const dialog = document.getElementById("status-dialog");
    if (dialog && !dialog.contains(event.target)) {
      setIsDialogOpen(false);
    }
  };

  // user selection for multiple delete
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = userData?.data
        ?.filter((user) => user.role.toLowerCase() !== userRole.admin)
        .map((user) => user.id);
      setSelectedUsers(new Set(allIds));
    } else {
      setSelectedUsers(new Set());
    }
  };

  // user selection for multiple delete
  const handleSelectUser = (userId) => {
    const updatedSelection = new Set(selectedUsers);
    if (updatedSelection.has(userId)) {
      updatedSelection.delete(userId);
    } else {
      updatedSelection.add(userId);
    }
    setSelectedUsers(updatedSelection);
  };

  const handleMultipleDelete = () => {
    setOpenMultipleDeleteModal(true);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleDelete = async () => {
      if (!isDelete) return;
      if (isDelete) {
        const res = await deleteUser(deleteItem.id);
        if (res?.data?.success) {
          toast.success("User deleted successfully");
          setIsDelete(false);
          setDeleteItem({});
          setIsDeleteModalOpen(false);
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Something went wrong");
          setIsDelete(false);
          setDeleteItem({});
          setIsDeleteModalOpen(false);
        }
      }
    };
    handleDelete();
  }, [isDelete, deleteItem, deleteUser]);

  useEffect(() => {
    if (!isMultipleDelete) return;

    const deleteIds = Array.from(selectedUsers);

    const deleteData = {
      ids: deleteIds,
    };

    const confirmDelete = async () => {
      if (isMultipleDelete) {
        const res = await deleteMultipleUsers(deleteData);
        if (res?.data?.success) {
          toast.success("Users deleted successfully");
          setIsMultipleDelete(false);
          setOpenMultipleDeleteModal(false);
          setSelectedUsers(new Set());
          setOpenErrorModal(false);
        }
        if (res?.error) {
          setIsMultipleDelete(false);
          setSelectedUsers(new Set());
          setOpenMultipleDeleteModal(false);
          setOpenErrorModal(true);
          setErrorMessage(res?.error?.data?.message || "Something went wrong");
        }
      }
    };

    confirmDelete();
  }, [isMultipleDelete, selectedUsers, deleteMultipleUsers]);

  return (
    <div
      className="w-full mx-auto mb-40"
      data-aos="fade-up"
      data-aos-duration="500"
      onClick={handleClickOutside}
    >
      <div>
        <h1 className="text-lg font-semibold text-tColor mb-2 text-center md:text-left">
          User Management
        </h1>
      </div>

      <div className="mb-4 bg-slate-100 shadow-lg p-2 md:p-6 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-2">
          <div className="flex flex-col md:flex-row md:items-end w-full lg:w-[50%] text-tColor gap-2">
            <div className="relative w-full">
              <p className="text-xs font-semibold mb-1">Search User</p>
              <div>
                <form
                  // onSubmit={(e) => handleSearch(e)}
                  className="flex items-center gap-2"
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
                      }}
                      className="border py-[4px] pl-8 pr-2 w-full flex-1 focus:outline-blue-500 border-blue-500 text-sm rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-gray-100 p-[7px] rounded-md w-[20%] flex justify-center items-center md:hidden hover:opacity-90"
                  >
                    <FaSearch className="md:hidden" />
                  </button>
                </form>
              </div>
            </div>

            <div className="hidden md:flex gap-3">
              <button className="bg-primary text-gray-100 text-sm font-semibold px-4 py-[5px] rounded-md hover:opacity-90">
                Search
              </button>
            </div>
          </div>
          <div className="flex gap-3 min-w-[180px] justify-end md:justify-center">
            <div>
              <button
                onClick={() => setCreateModalOpen(true)}
                className={`bg-primary text-gray-100 text-sm font-semibold px-3 py-[5px] rounded-md hover:opacity-90 items-center flex w-full`}
              >
                <FaPlus className="mr-2" /> Add New User
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoadingUsers ? (
        <div className="flex justify-center items-center gap-2 my-10">
          <FaSpinner className="animate-spin text-xl text-primary" />{" "}
          <p className="text-base font-semibold text-">Loading...</p>
        </div>
      ) : (
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
          <div className={`${isFetching ? "opacity-50 bg-gray-200" : ""}`}>
            <div
              className={`p-2 rounded-md my-4 text-tColor text-xs font-semibold flex items-center justify-start gap-2 scale-0 transition-all duration-300 ${
                selectedUsers.size > 0 ? "scale-100" : "scale-0"
              }`}
            >
              <p>{[...selectedUsers]?.length || 0} Item Selected</p>
              <button
                onClick={handleMultipleDelete}
                className="bg-red-500 text-white px-2 py-1 rounded-sm"
              >
                Delete
              </button>
            </div>

            {!isLoadingUsers && userData?.data?.length < 1 ? (
              <p className="text-xl my-10 text-center text-tColor font-semibold">
                No users found
              </p>
            ) : (
              <div
                className={`overflow-x-auto transition-all duration-300  ${
                  [...selectedUsers]?.length > 0 ? "mt-0" : "-mt-12"
                }`}
              >
                <ManageUsersTable
                  handleSelectAll={handleSelectAll}
                  handleSelectUser={handleSelectUser}
                  userData={userData}
                  selectedUsers={selectedUsers}
                  isLoadingUpdate={isLoadingUpdate}
                  isLoadingDelete={isLoadingDelete}
                  toggleDialog={toggleDialog}
                  isDialogOpen={isDialogOpen}
                  item={item}
                  handleStatusChange={handleStatusChange}
                  setUpdateModalOpen={setUpdateModalOpen}
                  setUpdateItem={setUpdateItem}
                  setDeleteItem={setDeleteItem}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              </div>
            )}

            <div
              className={`flex-col md:flex-row items-center gap-2 justify-between mt-2 ${
                userData?.data?.length < 1 ? "hidden" : "flex"
              }`}
            >
              <div>
                <p className="text-xs font-[500]">
                  Show {adjustedStartIndex} - {endIndex} of{" "}
                  {userData?.meta?.total} results
                </p>
              </div>

              {userData?.meta?.total <= itemsPerPage ? null : (
                <TablePagination
                  totalPages={Math.ceil(userData?.meta?.total / itemsPerPage)}
                  currentPage={page}
                  handlePageClick={handlePageClick}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        setIsDelete={setIsDelete}
        itemName={deleteItem?.name}
        disabledState={isLoadingDelete}
      />
      <MultipleDeleteConfirmModal
        isOpen={openMultipleDeleteModal}
        onClose={() => setOpenMultipleDeleteModal(false)}
        setIsDelete={setIsMultipleDelete}
        item={[...selectedUsers]?.length || 0}
        disabledState={isLoadingMultipleDelete}
      />
      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        setOpenErrorModal={setOpenErrorModal}
        setErrorMessage={setErrorMessage}
      />
      {updateModalOpen && (
        <UpdateUserModal
          isOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          updateData={updateItem}
          setOpenErrorModal={setOpenErrorModal}
          setErrorMessage={setErrorMessage}
        />
      )}
      <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => {
          setOpenErrorModal(false);
          setErrorMessage("");
        }}
      />
    </div>
  );
};

export default ManageUsers;
