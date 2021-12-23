import React ,{useState, useEffect, useContext}from 'react'
import './Orders.css'
import {Context} from '../../context/StateProvider'
import { db } from "../../firebase";
import Order from '../../Order'

export default function Orders() {

    const [state]= useContext(Context);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(state.user) {
            db
            .collection('users')
            .doc(state.user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            setOrders([])
        }
    
      }, [state.user])
    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order 
                       order={order} />
                ))}
            </div>
        </div>
    )
}
