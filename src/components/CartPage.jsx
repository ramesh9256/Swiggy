import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CDN_Link } from '../utils/constant';
import { clearCart, removeItem } from '../redux/cartSlice';

const CartPage = () => {
    const cartData = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeItem(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">My Cart</h1>
                {cartData.length > 0 ? (
                    <>
                        <button 
                            onClick={handleClear} 
                            className="mb-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
                            Clear Cart
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {cartData.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200"
                                >
                                    <img
                                        src={CDN_Link + item.imageId}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h2>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                                        <p className="text-green-600 font-bold mt-2">Rs {((item.price || item.defaultPrice || 0) / 100).toFixed(2)}</p>
                                        <button 
                                            className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 shadow-md"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default CartPage;