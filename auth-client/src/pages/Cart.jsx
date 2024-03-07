import React from 'react'
import { useCartContext } from '../context/CartContext'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCartContext()
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty + c.price, 0)
    const taxPrice = itemsPrice * 0.14
    const shippingPrice = itemsPrice > 2000 ? 0 : 20
    const totalPrice = itemsPrice + shippingPrice + taxPrice
    return (
        <div className="pt-14">
            <div className={cartItems?.length === 0 ? 'bg-gray-100 h-96' : 'bg-gray-100 '}>
                <div className="container mx-auto py-6">
                    <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">
                                My Food Cart
                            </h1>
                            <h2 className="font-semibold text-2xl">
                                {cartItems?.length || 0}
                            </h2>
                        </div>
                        <div className="mt-10 grid grid-cols-3 md:grid-cols-4 md:gap-20 gap-10 mb-5">
                            <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5 md:col-span-1 col-span-2">
                                Food Details
                            </h3>
                            <h3 className="md:font-semibold md:text-gray-900 md:text-xs md:uppercase md:w-2/5 md:block hidden">
                                Category
                            </h3>
                            <h3 className="md:font-semibold md:text-gray-900 md:text-xs md:uppercase md:w-2/5 md:block hidden">
                                Price
                            </h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                Total Price
                            </h3>
                        </div>
                        {
                            cartItems?.map((food) => {
                                return (
                                    <CartFood key={food._id} food={food} />
                                )
                            })
                        }
                        <div className={cartItems?.length === 0 ? 'mx-auto hidden items-end justify-center px-6 flex-col' : 'mx-auto justify-end px-6 flex-col'}>
                            <div className="text-right mb-2 font-semibold text-red-900">
                                Shipping : {shippingPrice}
                            </div>
                            <div className="text-right mb-2 font-semibold text-red-900">
                                Total Price : {totalPrice}
                            </div>
                            <Link to='/order'>
                                <button className="btn text-right ml-auto justify-end text-white hover:bg-red-600 btn-sm bg-red-500">
                                    Check Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

const CartFood = ({ food }) => {
    const { removeFromCart, addToCart } = useCartContext()
    return (
        <div className="grid grid-cols-3 gap-10 md:grid-cols-4 md:gap-20 items-center hover:bg-gray-100 -mx-8 px-6 py-5 ">
            <div className="flex col-span-2 md:col-span-1">
                <div className="w-[3rem]">
                    <img src={food?.foodImg} alt="" className='h-[5rem]' />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">
                        {food.name}
                    </span>
                    <span className="flex items-center space-x-4">
                        <div className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative">
                            <AiOutlineMinus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={() => removeFromCart(food)} />
                        </div>
                        <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium">
                            {food.qty}
                        </span>
                        <div className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative" onClick={() => addToCart(food)}>
                            <AiOutlinePlus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                        </div>
                    </span>
                </div>
            </div>

            <div className="md:flex md:justify-center md:w-1/5 md:cursor-pointer md:block hidden">
                <span className="font-bold text-sm">
                    {
                        food?.category
                    }
                </span>
            </div>
            <span className="md:font-bold md:text-sm md:w-1/5 md:text-center md:block hidden">
                {food?.price} X {food?.qty}
            </span>
            <span className="font-bold text-sm w-1/5 text-center ">
                {food.qty * food.price}
            </span>
        </div>
    )
}