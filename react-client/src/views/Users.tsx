import React, { useEffect, useState } from 'react'
import ServicePage from '../service'
import { Link } from 'react-router-dom'
import { IUser } from '../common/interface'

const Users = () => {

    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getUsers = async () => {
        setIsLoading(true)
        const data: any = await ServicePage.getUsers();
        if (data?.data) {
            setUsers(data?.data)
        }
        setIsLoading(false)
    }

    const onDeleteClick = async (user: IUser) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        const data: any = await ServicePage.deleteUser(user?.id!)
        console.log(data?.data)
    }

    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {isLoading &&
                        <tbody>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!isLoading &&
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/users/' + user.id}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(user)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default Users
