import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import axios from 'axios'

export default function ProtectRoute({children}){
    const {user, setUser} = useUserContext()
    const navigate = useNavigate()

    const getUser = async () => {
        try {
            const res = await axios.post('https://tikkantalk.onrender.com/api/v1/user/getUser', {
                token : localStorage.getItem('token')
            }, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setUser(res.data.data)
            }else{
                navigate('/login')
                localStorage.clear()
            }
        } catch (error) {
            localStorage.clear()
            console.log(error)
        }
    }

    useEffect(() => {
        if(!user){
            getUser()
        }
    }, [user])

    if(localStorage.getItem('token')){
        return children
    }else{
        <Navigate to='/login'/>
    }
}