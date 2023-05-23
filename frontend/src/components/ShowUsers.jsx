import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axiosAPI from '../api/axiosAPI';

const endPoint = '/api/users/'

const ShowUsers = () => {
    const navigate = useNavigate()
    const [ users, setUsers ] = useState( [] )
    useEffect( ()=> {
        getAllUsers()
    }, [])



    const getAllUsers = async () => {
        const response = await axiosAPI.get(`${endPoint}`)
        setUsers(response.data)
        console.log(response.data)
    }

    const deleteAllUsers = async (id) => {
        await axiosAPI.delete(`${endPoint}${id}`)
        navigate('/users')
    }

  return (
    <div>
        <div className='d-grip gap-2'>
            <Link to="/createUser" className='btn btn-success btn-lg mt-2 mb-2 text white'>Create</Link>
        </div>

        <table className='table table-stripped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                { users.map ( (user => (
                    <tr key={user.user_id}>
                        <td> {user.username} </td>
                        <td> {user.email} </td>
                        <td> {user.user_type} </td>
                        <td>
                            <Link to={`/editUser/${user.user_id}`} ><button className='btn btn-warning'>Edit</button></Link>
                            <button onClick={ ()=>deleteAllUsers(user.user_id) } className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowUsers