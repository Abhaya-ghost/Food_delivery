import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import avatar from '../assets/profile.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUserContext } from '../context/UserContext'

const Profile = () => {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/all/upload-image', formData)
            console.log(data)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            toast.success('Uploaded image')
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const country = form.country.value
        const city = form.city.value
        const state = form.state.value
        const zipcode = form.zipcode.value
        const profileImg = image?.url

        try {
            const res = await axios.put('http://localhost:8000/api/v1/user/updateProfile', {
                userId: user.user._id,
                name,
                country,
                city,
                state,
                zipcode,
                profileImg
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                form.reset()
                location.reload()
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="profile">
            <div className="w-full mx-auto pt-[16vh]">
                <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <img src={image?.url || user?.user?.profileImg } alt="" className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer' />
                    </label>
                    <label htmlFor="" className='block text-center text-gray-900 text-base mb-2'>Profile Picture</label>
                    <input type="file" label="Image" onChange={handleImage} name='myFile' id='file-upload' className='hidden' accept='.jpeg, .png, .jpg' />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">

                        <input type="text" name='name' placeholder={user?.user?.name} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="email" disabled name='email' placeholder={user?.user?.email} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" name='country' placeholder={user?.user?.country || 'Country'} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" name='city' placeholder={user?.user?.city || 'City'} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" name='state' placeholder={user?.user?.state || 'State'} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" name='zipcode' placeholder={user?.user?.zipcode || 'ZipCode'} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 mb-3 mt-5 text-xl font-medium text-white mx-auto text-center" type='submit'>Update Profile</button>

                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Profile