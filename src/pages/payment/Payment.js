import React,{useContext, useState, useEffect} from 'react'
import './payment.css'
import {Context} from '../../context/StateProvider'
import CheckoutProduct from '../../CheckoutProduct'
import {Link, useHistory} from 'react-router-dom'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from '../../axios';
import { db } from "../../firebase";


export default function Payment() {
    


    const [state]= useContext(Context);

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory()

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    // to add total price of items from baskets functions
    const totalPrice =  state.basket.reduce((a, b) => {  
        return a + b.price;
      }, 0);

      useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${totalPrice * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();

    }, [state.basket])

    console.log("the secrect is ==> ", clientSecret);

    const handleSubmit = async (e) => {
          // do all the fancy stripe stuff...
          e.preventDefault();
          setProcessing(true);

          const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            // to store the soled item in time line database(firebase)
            db
                .collection('users') //the name of the collection
                .doc(state.user?.uid) // the user id
                .collection('orders')
                .doc(paymentIntent.id)
                .set({  // the place to see the product items
                    basket: state.basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            

            history.replace('/orders') // b/c we don't need to come back to payment page

    }
        )

}
        

    const handleChange = (e) => {
         // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
        
    }


    return (
        <div className="payment">

         <div className="payment__container">
        
             <h1>
               Checkout(<Link to='/checkout'> {state.basket.length} Items</Link>)
            </h1>
            
            <div className="payment_section deliveryAddress">
                    <h3>Delivery Address</h3>
                    <p>email:{state.user?.email}</p>
                    <h4>23 React Land</h4>
                    <h4>lefkosa haspolat</h4>

                </div>
<hr />
                <div className="payment_section reviewItem">
                {state.user && state.basket.map( item =>(
                            <CheckoutProduct item={item}/>
                        ))}
                    
                </div>
<hr />
                <div className="payment_section PaymentMethod">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>

                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={totalPrice}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />

                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>

                                      {/* Errors */}
                                     {error && <div>{error}</div>}
                                </div>
                        </form>
                    </div>
                    
                </div>
         </div>
        </div>
    )
}
