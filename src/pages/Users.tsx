import { useEffect, useState } from "react";
import { getUsersPaged, createUser } from "../services/userService";
import type { UserDto } from "../dtos/UserDtos";
import UserForm from "../components/UserForm";
import ConfirmModal from "../components/ConfirmModal";

const PAGE_SIZE = 5;

const Users = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editUser, setEditUser] = useState<UserDto | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserDto | null>(null);

  const fetchUsers = () => {
    getUsersPaged(page, PAGE_SIZE).then((res) => {
      if (res && res.data) {
        setUsers(res.data.items);
        setTotalPages(res.data.totalPages);
      } else {
        setUsers([]);
        setTotalPages(1);
      }
    });
  };

  useEffect(() => {
    fetchUsers();  
  }, [page]);

  const handleAddUser = () => {
    setFormMode("create");
    setEditUser(null);
    setModalOpen(true);
  };

  const handleEditUser = (user: UserDto) => {
    setFormMode("edit");
    setEditUser(user);
    setModalOpen(true);
  };

  const handleFormCancel = () => setModalOpen(false);

  const handleFormSubmit = async (data: any) => {
    if (formMode === "create") {
      const result = await createUser(data);
      setModalOpen(false);
      if (result && result.success) {
        setToast("User created successfully");
        fetchUsers();
      }
    } else if (formMode === "edit" && editUser) {     
      const updateData = { ...data, id: editUser.id };
      if (!updateData.password) delete updateData.password;
      const { updateUser } = await import("../services/userService");
      const result = await updateUser(editUser.id, updateData);
      setModalOpen(false);
      if (result && result.success) {
        setToast("User updated successfully");
        fetchUsers();
      }
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div>
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in flex items-center gap-4 min-w-[250px] max-w-[90vw]">
          <span className="flex-1">{toast}</span>
          <button
            className="ml-2 text-white font-bold hover:text-gray-200 focus:outline-none"
            onClick={() => setToast(null)}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>
      )}
      <ConfirmModal
        open={deleteModalOpen}
        title="Delete User"
        message={
          userToDelete
            ? `Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          if (userToDelete) {
            const { deleteUser } = await import("../services/userService");
            await deleteUser(userToDelete.id);
            setDeleteModalOpen(false);
            setUserToDelete(null);
            setToast("User deleted successfully");
            fetchUsers();
          }
        }}
      />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight text-react-dark relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 inline text-react" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>
            Users
            <span className="block w-12 h-1 bg-react rounded mt-2"></span>
          </span>
        </h2>
        <button
          className="flex items-center gap-2 bg-react text-white font-semibold px-5 py-2 rounded-xl shadow transition-all duration-200 hover:bg-[#1fc8f8] hover:shadow-lg hover:scale-105 active:scale-100"
          onClick={handleAddUser}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
            <UserForm
              mode={formMode}
              initialValues={editUser || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow mb-4">
        <table className="min-w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left rounded-tl-lg shadow-sm">
                First Name
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left shadow-sm">
                Last Name
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left shadow-sm">
                Email
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left shadow-sm">
                Phone
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-center rounded-tr-lg shadow-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 px-4 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-cyan-50"
                  } hover:bg-cyan-100`}
                >
                  <td className="py-3 px-5 border-b border-gray-100 font-medium text-gray-700">
                    {user.firstName}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-gray-700">
                    {user.lastName}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-gray-700">
                    {user.email}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-gray-700">
                    {user.phone}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-center">
                    <button
                      className="inline-flex items-center justify-center p-2 rounded hover:bg-blue-50 mr-2"
                      title="Edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                    <button
                      className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50"
                      title="Delete"
                      onClick={() => {
                        setUserToDelete(user);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m5 0H4" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;