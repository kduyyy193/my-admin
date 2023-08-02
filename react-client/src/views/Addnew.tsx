import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import ServicePage from "../service";
import { IUser } from "../common/interface";

const Addnew = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [user, setUser] = useState<IUser>({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { setNotification } = useStateContext()

    const getUser = async (id: string) => {
        setIsLoading(true)
        const data: any = await ServicePage.getUser(id);
        if (data?.data) {
            setUser(data?.data)
        }
        setIsLoading(false)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.id) {
            const res: any = await ServicePage.updateUser(user)
            console.log(res)
            if (res.data) {
                setNotification('User was successfully updated')
                navigate('/users')
            }
            if (res.data.errors) {
                setErrors(res.data.errors)
            }
        } else {
            const res: any = await ServicePage.addUser(user)
            if (res.data) {
                setNotification('User was successfully created')
                navigate('/users')
            }
            if (res.data.errors) {
                setErrors(res.data.errors)
            }   
        }
    }

    useEffect(() => {
        if (id) {
            getUser(id)
        }
    }, [id])

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {isLoading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!isLoading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
                        <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
                        <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
                        <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}
export default Addnew
