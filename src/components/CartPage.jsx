import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CDN_Link } from '../utils/constant'
import { clearCart } from '../redux/cartSlice'

const CartPage = () => {
    const cartData = useSelector((store) => store.cart.items)
    


    //  dispatch Action


    const dispatch = useDispatch();

    const HandleClear = () => {
        dispatch(clearCart());
    }
    return (
        <div>
            <button onClick={HandleClear}>Clear Cart</button>
            <h1>
                My cart page
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-b-lg">
                {cartData?.map(item => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:scale-101"

                    >
                        <img
                            src={CDN_Link + item.imageId}
                            alt={item.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-900 truncate">{item.name}</h2>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>
                            <p className="text-green-700 font-bold mt-2">
                                Rs {((item.price || item.defaultPrice || 0) / 100).toFixed(2)}
                            </p>

                            <button className="mt-4 w-full px-5 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-400 transition-all shadow-md" onClick={() => { HandleAddButton(item) }}>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default CartPage
