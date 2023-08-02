import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../common/interface'
import ServicePage from '../service'
import { useStateContext } from '../contexts/ContextProvider'
import routerLinks from '../common/routerLinks'

const Login = () => {

    const { setUser, setToken } = useStateContext()
    const navigate = useNavigate()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        const payload: IUser = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        }
        if (payload) {
            const data: any = await ServicePage.signin(payload)
            setToken(data?.token)
            setUser(data?.user)
            if (data?.token) {
                navigate(routerLinks('Sign In'))
            }
        }
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <h1 className='title'>Login into your account</h1>
                    <input ref={emailRef} placeholder='Email' type='email' />
                    <input ref={passwordRef} placeholder='Password' type='password' />
                    <button className='btn btn-block'> Login</button>
                    <p className='message'>
                        Not Registered? <Link to={'/signup'}>Create an acount</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
