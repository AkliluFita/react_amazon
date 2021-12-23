import React,{useContext} from 'react'
import './CheckoutProduct.css'
import {Context} from './context/StateProvider'


export default function CheckoutProduct({item, hideButton}) {

const [state, dispatch]= useContext(Context);

    const handleRemove = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:item.id
        })
    }

    return (
        <div className="CheckoutProduct">
            <div className="checkoutProduct__img">
                <img className= "checkoutProduct__img" src={item.image}
                height="300px" alt="" />
            </div>
            <div className="checkoutProduct__info">
                <p>{item.title}</p>
                <p>*****</p>
                <div className="checkoutProduct__rating">
                    <small>$</small>
                    <strong>{item.price}</strong>
                </div>
                <div className="checkoutProduct__rating">
                    {Array(item.rating)
                    .fill()
                    .map((_, i) => (
                        <p className="starts">🌟</p>
                    ))}
                  </div>
               { !hideButton && <button onClick={handleRemove}>Remove from the cart</button>}
            </div>

        </div>
    )
}
