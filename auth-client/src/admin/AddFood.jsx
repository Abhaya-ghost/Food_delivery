import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const AddFood = () => {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()

    const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await axios.post('https://tikkantalk.onrender.com/api/v1/all/upload-image', formData)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            if (uploading === false) {
                toast.success('Successfully added')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const price = form.price.value
        const category = form.category.value
        const weight = form.weight.value
        const location = form.location.value
        const description = form.description.value
        const foodImg = image?.url

        const res = await axios.post('https://tikkantalk.onrender.com/api/v1/food/addfood', {name, price, category, weight, location, description, foodImg}, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data.success){
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }
    return (
        <div className="addfood">
            <div className="w-full mx-auto pt-[16vh]">
                <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  rounded-md px-8 py-5" onSubmit={handleSubmit}>
                    <NavLink to='/'>
                        <img src={logo} alt="" className='logo mx-auto mb-6 cursor-pointer text-center' />
                    </NavLink>
                    <div className="md:grid md:grid-cols-1 sm:grid-cols-2 gap-4 items-center">


                        <input type="text" name='name' placeholder='Enter food name' className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />


                        <input type="file" name='myFile' className="file-input bg-red-500 text-white file-input-md text-white file-input-bordered my-2 w-full" onChange={handleImage} accept='.jpeg, .png, .jpg' />

                        <input type="number" name='price' placeholder='Enter price' className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <select name="category" id="" className="select my-2 bg-red-500 text-white select-md w-full max-w-ws">
                            <option value='DEFAULT' disabled>Category</option>
                            <option value="Rice">Rice</option>
                            <option value="Desert">Desert</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Fruits">Fruits</option>
                            <option value="MainCourse">Main Course</option>
                        </select>

                        <input type="number" name='weight' placeholder='Enter Weight' className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" name='location' placeholder='Enter location' className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <textarea name="description" placeholder='Description' className="textarea textarea-ghost shadow-sm bg-white col-span-2 appearance-none border my-2 rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 mb-3 mt-5 text-xl font-medium text-white mx-auto text-center" type='submit'>Add Food</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default AddFood