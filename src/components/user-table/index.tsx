import { useDeleteUser } from '@/api';
import { DeleteModal } from '@/components';
import { AiOutlineDelete, AiOutlineEdit } from '@/icons';
import { User } from '@/types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './user-table.css';
import { UserContext } from '@/providers/user-provider';

type Props = {
  users: User[];
};

export function UserTable({ users }: Props) {
  const [deleteId, setDeleteId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userCtx = useContext(UserContext);

  const changeUser = (user: User) => {
    userCtx?.dispatch({
      type: 'login',
      payload: {
        id: user.id || 0,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
      },
    });
  };

  const logout = () => {
    userCtx?.dispatch({
      type: 'logout',
      payload: {
        id: 0,
        first_name: 'meh',
        last_name: 'meh',
        email: '',
        gender: '',
      },
    });
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  function showDeleteModal(id: number) {
    setDeleteId(id);
    setIsModalOpen(true);
  }

  const deleteMutation = useDeleteUser({ closeModal });

  const handleDelete = async (id: number) => {
    deleteMutation.mutateAsync(id);
  };

  return (
    <>
      <DeleteModal
        id={deleteId}
        isModalOpen={isModalOpen}
        cancelAction={closeModal}
        deleteAction={handleDelete}
        isLoading={deleteMutation.isLoading}
      />

      <div className="flex justify-between items-center mb-4">
        <Link
          to="/user/create"
          className="py-1 px-4 font-semibold text-teal-900 rounded border-2 border-teal-700 hover:text-white hover:bg-teal-800 hover:border-none"
        >
          Create User
        </Link>
      </div>
      <table className="table-fixed text-gray-800">
        <thead className="text-white bg-cyan-900">
          <tr className="py-4">
            <th className="w-1/12">Id</th>
            <th className="w-3/12">Name</th>
            <th className="w-3/12">Email</th>
            <th className="w-1/12">Gender</th>
            <th className="w-1/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: User) => (
              <tr
                className="bg-white border border-cyan-800 hover:bg-lime-100 active:text-lime-100 active:bg-lime-700"
                key={user.id}
              >
                <td
                  onClick={() => {
                    console.log('logout');
                    logout();
                  }}
                >
                  {user.id}
                </td>
                <td
                  onClick={() => {
                    console.log('login');
                    changeUser(user);
                  }}
                >
                  {user.first_name} {user.last_name}
                </td>
                <td className="hover:underline">{user.email}</td>
                <td>{user.gender}</td>
                <td className="inline-flex border-none">
                  <Link
                    className="p-2 text-cyan-800 hover:text-cyan-500"
                    to={`/user/edit/${user.id}`}
                  >
                    <AiOutlineEdit />
                  </Link>
                  <button
                    className="p-2 text-cyan-800 hover:text-cyan-500"
                    onClick={() => showDeleteModal(user.id!)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
