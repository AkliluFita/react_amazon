import React,{useState} from 'react'
import './login.css'
import {Link, useHistory} from 'react-router-dom'
import { auth } from "../../firebase";

export default function Login() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const history = useHistory();

// login function
const handleLogin = (e) => {
    e.preventDefault()

    auth
    .signInWithEmailAndPassword(email, password)
    .then(auth => {
        history.push('/')
    })
    .catch(error => alert(error.message))
}

// register function
const handleRegister = (e) => {
    e.preventDefault()

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
            // console.log(auth);
            history.push('/') //push to the home page
        }
    })
    .catch(error => alert(error.message))
}



    return (
        <div className="login">
            <Link to='/'>
                <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    className="logo"
                    alt="" width="100px"/>
            </Link>

            <div className="login_container">
                
                <form action="" className='login_form' onSubmit={handleLogin}>
                    <h2>Sign In</h2>

                    <label>E-mail </label>
                    <input 
                       type="text"
                       className="form_control"
                       onChange={e => setEmail(e.target.value)}
                       value={email}/>
                   
                    <label >Password </label>
                    <input 
                        type="password" 
                        className="form_control" 
                        onChange={e => setPassword(e.target.value)}
                        value={password}/>
                   
                    <button className="form_control" type='submit'>Sign in</button>
                    <p>by signing-in you aggree to the amazon fake clone 
                        conditions of Use $ sale.please see out privacy
                        notice, our coolied notice and our interest-based ads 
                        notice
                    </p>
                    <button className="form_control" onClick={handleRegister}>Create your account</button>
                </form>
            </div>
        </div>
    )
}
