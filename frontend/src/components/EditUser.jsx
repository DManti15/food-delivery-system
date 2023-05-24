import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";

import axiosAPI from '../api/axiosAPI';

const endpoint = '/api/users/'

const options = [
    { value: 1, label: "Administrator"},
    { value: 2, label: "User"},
];

const EditUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axiosAPI.put(`${endpoint}${id}`, {user_type: role})
        navigate('/admin-home/users')
    }

    const handleRoleChange = (selectedOption) => {
        setRole(selectedOption['value']);
      };

    useEffect( () => {
        const getUserById = async () => {
            const response = await axiosAPI.get(`${endpoint}${id}`)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setRole(response.data.user_type)
        }
        getUserById()
    }, [])

  return (
    <div>
        <h3>Edit User</h3>
        <form onSubmit={update}>
            <div>
                <label>{username}</label>
                <label>{email}</label>
                <Select
                    options={options}
                    getOptionLabel={(option) =>
                        option.label.charAt(0).toUpperCase() + option.label.slice(1)
                    }
                    placeholder="User Role"
                    value={options.value}
                    onChange={handleRoleChange}
                />
            </div>
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default EditUser
