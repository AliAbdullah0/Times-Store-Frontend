import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CanceledOrders() {
    const [canceledOrders, setCanceledOrders] = useState([]);
    const [isCanceledLoading, setIsCanceledLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchCanceledOrders();
    }, []);

    const fetchCanceledOrders = async () => {
        setIsCanceledLoading(true);
        try {
            const response = await axios.get(`https://times-store-production.up.railway.app/api/canceleds?populate=*`);
            setCanceledOrders(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsCanceledLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 bg-white light:bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
            <h2 className="text-3xl font-extrabold text-pink-500 mb-6">Canceled Orders</h2>

            {isCanceledLoading ? (
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
            ) : canceledOrders.length > 0 ? (
                <ul className="space-y-4">
                    {canceledOrders.map((order) => (
                        <li
                            key={order.id}
                            className="bg-black p-4 rounded-lg shadow-md text-white dark:bg-white dark:text-black"
                        >
                            <h3 className="text-xl font-semibold text-pink-600">
                                Order ID: {order.OrderId}
                            </h3>
                            <p className="text-neutral-200 dark:text-neutral-500">
                                Product: {order.Product || 'N/A'}
                            </p>
                            <p className="text-neutral-200 dark:text-neutral-500">
                                Ordered By: {order.OrderedBy}
                            </p>
                            <p className="text-neutral-200 dark:text-neutral-500">
                                Email: {order.Email}
                            </p>
                            <p className="text-neutral-200 dark:text-neutral-500">
                                Ordered On: {new Date(order.OrderedOn).toLocaleDateString()}
                            </p>
                            <p className="text-neutral-200 dark:text-neutral-500">
                                Canceled On: {new Date(order.CanceledOn).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-200 dark:text-gray-400">No canceled orders found.</p>
            )}
        </div>
    );
}

export default CanceledOrders;
