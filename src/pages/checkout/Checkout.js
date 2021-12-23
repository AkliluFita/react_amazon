import React,{useContext} from 'react'
import './checkout.css'
import Subtotal from '../../Subtotal'
import CheckoutProduct from '../../CheckoutProduct'
import {Context} from '../../context/StateProvider'
// import { auth } from "../../firebase";




export default function Checkout() {

const [state]= useContext(Context);


    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                className="checkout__ad"
                src="http://computerservicesmv.com/wp-content/uploads/2017/08/software_applications_development_calicut-.png"
                 alt="" />

                <div className="checkout__title">
                    <h2 style={{fontSize:"14px"}}>hello Dear:"{state.user?state.user.email:"please sign in first and select the items from home page"}"</h2>
                    <h2>{ state.user && "your shopping basket"}</h2>
                    {state.user && state.basket.map( item =>(
                        <CheckoutProduct 
                                    item={item}/>
                    ))}
                </div>
            </div>

           { state.user && (<div> 
                              <h2>subtotal will go here</h2>
                                    <Subtotal/>
                            </div>)}
        </div>
    )
}
