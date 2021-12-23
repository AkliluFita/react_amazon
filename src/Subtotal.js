import React,{useContext} from 'react'
import CurrencyFormat from 'react-currency-format'
import './subtotal.css'
import {Context} from './context/StateProvider'
import {useHistory} from 'react-router-dom'


export default function Subtotal() {
    const [state]= useContext(Context);
    const history = useHistory();

// to add total price of items from baskets functions
    const totalPrice =  state.basket.reduce((a, b) => {  
        return a + b.price;
      }, 0);
       
    //  console.log(totalPrice);

    return (
        <div className='subtotal'>
            <CurrencyFormat
              renderText={(value) =>(
                  <>
                    <p>
                      Subtotal ({state.basket?.length} item): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"  /> this order 
                        contain  a gift
                    </small>
                  </>
              )}
              decimalScale={2}
              value={totalPrice} //part the home work
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />

            <button onClick={e => history.push("/payment")}>procced to chekout</button>
         
        </div>
    )
}
