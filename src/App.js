import React,{useEffect, useContext}from 'react'
import './App.css';
import Header from './Header'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Checkout from './pages/checkout/Checkout'
import Login from './pages/login/Login'
import {Context} from './context/StateProvider'
import {auth} from './firebase'
import Payment from './pages/payment/Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './pages/orders/Orders'

const promise = loadStripe(
  "pk_test_51JtJjoLvEhMFDyOWiI580DumwItoGCWNwtebGF4f3ojUOHLACosKtT5pENOzZy3ujMj7WFah3RY0W0XGXIwSdStv007IBEp9Mr"
)

function App() {

  const [state, dispatch]= useContext(Context);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    
  }, [])

  return (
   <Router>
   <div className="app">

     <Switch>

       <Route path="/login">
         <Login/>
        </Route>

        <Route exact path="/">
           <Header/>
           <Home/>
        </Route>

        <Route path="/checkout">
           <Header/>
           <Checkout/>
        </Route>

        <Route path="/payment">
           <Header/>
           <Elements stripe={promise}>
             <Payment/>
           </Elements>
        </Route>

        <Route path="/orders">
           <Header/>
           <Orders/>
        </Route>

     </Switch>

  </div>

</Router>
  );
}

export default App;
