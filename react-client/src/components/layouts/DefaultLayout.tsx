import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import ServicePage from '../../service'
import routerLinks from '../../common/routerLinks'

const DefaultLayout = () => {

  const navigate = useNavigate()

  const { user, token, setUser, setToken } = useStateContext();

  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e?.preventDefault()
    const res = await ServicePage.logout()
    setUser({})
    setToken(null)
  }

  useEffect(() => {
    if (!token) {
      navigate(routerLinks('login'))
    }
  }, [token])

  return (
    <div>
      <div id='defaultLayout'>
        <aside>
          <Link to={'/dashboard'}> Dashboard
          </Link>
          <Link to={'/users'}> Users
          </Link>
        </aside>
        <div className='content'>
          <header>
            <div>
              header
            </div>
            <div>
              {user?.name}
              <a className='btn-logout' href='#' onClick={onLogout}>Logout</a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
