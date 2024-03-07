import { createContext, useContext, useState } from "react";

const CartContext = createContext()

const CartProvider = ({children}) => {
    const [food, setFood] = useState(null)
    const [cart, setCart] = useState([])
    const [cartItems, setCartItems] = useState([])

    const addToCart = (food) => {
        const exist = cartItems.find((x) => x._id === food._id)

        if(exist){
            setCartItems(
                cartItems.map((x) => x._id === food._id ? {...exist,qty:exist.qty+1} : x)
            )
        }else{
            setCartItems(
                [...cartItems, {...food, qty : 1}]
            )
        }
    }

    const removeFromCart = (food) => {
        const exist = cartItems.find((x) => x._id === food._id)

        if(exist.qty === 1){
            setCartItems(
                cartItems.filter((x) => x._id !== food._id)
            )
        }else{
            setCartItems(
                cartItems.map((x) => x._id === food._id ? {...exist, qty:exist.qty-1} : x)
            )
        }
    }
    

    return (
        <CartContext.Provider value={{cartItems, removeFromCart, addToCart}}>
            {
                children
            }
        </CartContext.Provider>
    )
}

const useCartContext = () => {
    return useContext(CartContext)
}

export {CartProvider, useCartContext}