import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import { useUserContext } from '../context/UserContext'
import axios from 'axios'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const MyOrder = () => {
    const { cartItems, removeFromCart, addToCart } = useCartContext()
    const { user, setUser } = useUserContext()
    const [orders, setOrders] = useState([])

    const getMyOrders = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/order/getOrder', {
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
        getMyOrders()
    }, [])
    return (
        <div className="">
            <div className="pt-14">

                <div className="container mx-auto py-6">
                    <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">
                                My Food Cart
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
                                Delivery
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-1/5 md:block hidden">
                                Time
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase text-center md:w-1/5 w-1/3">
                                Amount
                            </h3>
                        </div>
                        {
                            orders?.map((food) => {
                                return (
                                    <CartFood key={food._id} food={food} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder

const CartFood = ({ food }) => {
    return (
        <>
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 gap-1.5">
            <div className="flex md:w-2/5 w-2/3 mt-10">
                <div className="md:grid md:grid-cols-3">
                    {
                        food?.items?.map((item) => <>
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
                    <img src={food?.foodImg} alt="" className='h-20' />
                </div>
            </div>

            <div className="flex justify-center text-center md:w-1/5 hidden cursor-pointer md:block">
                <span className="font-bold text-sm">
                    {
                        food?.payment === false && <span className="font-bol text-sm">Not Paid</span>
                    }
                    {
                        food?.payment && <span className="font-bol text-green-600 text-sm">Paid</span>
                    }
                </span>
            </div>
            <div className="flex justify-center md:w-1/5 w-1/3 cursor-pointer">
                <span className="font-bol text-sm">{food?.status}</span>
            </div>
            <span className="font-bold text-sm w-1/5 text-center md:block hidden">
                {food?.createdAt}
            </span>
            <span className="font-bold text-sm md:w-1/5 w-1/3 text-center">
                {food?.totalAmount}
            </span>
        </div>
        <hr />
        </>
    )
}