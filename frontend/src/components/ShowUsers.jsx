import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosAPI from "../api/axiosAPI";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";

const endPoint = "/api/users/";

const ShowUsers = ({ isOpen, handleIsOpen }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleStateChange = (e) => {
    isOpen = true;
    let newState = isOpen;
    const btnClass = e.target.classList;
    const options = btnClass.contains("options-btn");
    const edit = btnClass.contains("edit-btn");
    if (options) handleIsOpen(newState, 1);
    else if (edit) handleIsOpen(newState, 2);
  };

  const getAllUsers = async () => {
    const response = await axiosAPI.get(`${endPoint}`);
    setUsers((prevUsers) => {
      if (JSON.stringify(prevUsers) !== JSON.stringify(response.data)) {
        return response.data;
      }
      return prevUsers;
    });
  };

  const deleteAllUsers = async (id) => {
    await axiosAPI.delete(`${endPoint}${id}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    navigate("/admin-home/users");
  };

  useEffect(() => {
    getAllUsers();
  }, [users]);

  return (
    <div className="wrapper">
      <h2 className="table-title">Users</h2>
      <div className="table-container">
        <div className="table-options">
          <button className="flex-btn options-btn" onClick={handleStateChange}>
            Add User <Plus size="1.5rem" />
          </button>
        </div>
        <table className="table-dashboard table-stripped">
          <thead className="bg-primary text-white">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="no-bottom-border" key={user.user_id}>
                <td> {user.username} </td>
                <td> {user.email} </td>
                <td> {user.user_type} </td>
                <td className="flex-cell">
                  <button
                    className="flex-btn edit-btn"
                    onClick={handleStateChange}
                  >
                    Edit <PencilSimple size="1.5rem" />
                  </button>
                  <button
                    onClick={() => deleteAllUsers(user.user_id)}
                    className="flex-btn delete-btn"
                  >
                    Delete
                    <Trash size="1.5rem" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowUsers;
