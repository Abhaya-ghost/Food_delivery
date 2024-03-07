import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useUserContext } from '../context/UserContext'

const AllOrder = () => {
    const { user, setUser } = useUserContext()
    const [orders, setOrders] = useState([])

    const getAllOrders = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/order/getOrders', {
                userId: user?.user._id,
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data)

            if (res.data.success) {
                setOrders(res.data.data)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])
    return (
        <div className="">
            <div className="pt-14">

                <div className="container mx-auto py-6">
                    <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">
                                Order List
                            </h1>
                        </div>
                        <div className="mt-10 flex mb-5">
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-2/5 w-2/3">
                                Food Details
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-1/5 md:block hidden">
                                Payment
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-1/5 w-1/3">
                                Recieved
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-1/5 w-1/3">
                                Delivery
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-1/5 md:block hidden">
                                Amount
                            </h3>
                        </div>
                        {
                            orders?.map((order) => {
                                return (
                                    <CartFood key={order._id} order={order} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllOrder

const CartFood = ({ order }) => {
    const { user, setUser } = useUserContext()
    const handleDelivered = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/order/delivered', {
                userId: user?.user._id,
                orderId: id,
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data)

            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <>
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 gap-1.5">
                <div className="flex md:w-2/5 w-2/3 mt-10">
                    <div className="md:grid md:grid-cols-3">
                        {
                            order?.items?.map((item) => <>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <div>
                                        <img src={item?.food.foodImg} alt="" className='h-20' />
                                    </div>
                                    <span className="font-bold text-sm">
                                        {item?.food?.name}
                                    </span>
                                    <span className="flex items-center space-x-4 ">
                                        qty : <span className="text-red-500 px-3 py-2 bg-slate-50 tet-lg font-medium">
                                            {item?.qty}
                                        </span>
                                    </span>
                                </div>
                            </>)
                        }
                    </div>
                </div>

                <div className="flex justify-center md:w-1/5 md:block hidden cursor-pointer">
                    <span className="font-bold text-sm">
                        {
                            order?.payment === false && <span className="font-bol text-sm">Not Paid</span>
                        }
                        {
                            order?.payment && <span className="font-bol text-green-600 text-sm">Paid</span>
                        }
                    </span>
                </div>
                <div className="flex justify-center md:w-1/5 w-1/3 cursor-pointer">
                    <span className="font-bol text-sm">{order?.status}</span>
                </div>
                <div className="flex justify-center md:w-1/5 w-1/3 cursor-pointer">
                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md md:w-full w-[5rem] rounded-full md:px-8 md:py-2 md:text-xl text-base font-medium text-white mx-auto text-center" onClick={() => handleDelivered(order?._id)}>Deliver</button>
                </div>
                <span className="font-bold text-sm md:w-1/5 md:block hidden text-center">
                    {order?.totalAmount}
                </span>
                <ToastContainer />
            </div>
            <hr />
        </>
    )
}