import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserContext } from '../context/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const {setUser} = useUserContext()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    const userData = { email, password }

    fetch('https://tikkantalk.onrender.com/api/v1/user/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.data.token),
          setUser(data.data)
            toast.success(data.message)
          form.reset()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      })
  }

  return (
    <div className="login">
      <div className="h-screen pt-[16vh]">
        <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
          <NavLink to='/'>
            <img src={logo} alt="" className='logo mb-6 cursor-pointer text-center w-[5rem] h-[5rem]' />
          </NavLink>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
              Email
            </label>
            <input type="email" name='email' placeholder='Enter your email' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
              Password
            </label>
            <input type="password" name='password' placeholder='*******' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type='submit'>Sign In</button>
          <Link to='/register' className='text-[#fdc55e] text-center front-semibold w-full mb-3 py-2 px-4 rounded'>
            Create an account
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  )
}

export default Login