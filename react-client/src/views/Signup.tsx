import axios from 'axios'
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ServicePage from '../service'
import { IUser } from '../common/interface'
import { useStateContext } from '../contexts/ContextProvider'
import routerLinks from '../common/routerLinks'

const Signup = () => {

    const navigate = useNavigate()

    const {setUser, setToken} = useStateContext()

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const ConfirmPasswordRef = useRef<HTMLInputElement>(null)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        const payload: IUser = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: ConfirmPasswordRef.current?.value,
        }
        if(payload) {
            const data: any = await ServicePage.signup(payload)
            setToken(data?.token)
            setUser(data?.user)
            if(data?.token) {
                navigate(routerLinks('Sign In'))
            }
        }
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <h1 className='title'>Login into your account</h1>
                    <input ref={nameRef} placeholder='Fullname' type='text' />
                    <input ref={emailRef} placeholder='Email Address' type='email' />
                    <input ref={passwordRef} placeholder='Password' type='password' />
                    <input ref={ConfirmPasswordRef} placeholder='Password Confirmation' type='password' />
                    <button className='btn btn-block'> Sign up</button>
                    <p className='message'>
                        Are Registered? <Link to={'/login'}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
