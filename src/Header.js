import React,{useContext}from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom'
import {Context} from './context/StateProvider'
import {auth} from './firebase'


export default function Header() {

    const [state]= useContext(Context);

    const handleSingOut = () => {
        auth.signOut()
    }
    
    console.log(state.user);

    return (
        <div className="header">
            <Link to='/'>
                <img
                    className='header-logo'
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            
            </Link>

            <div className="header__search">
                <input className="header__searchInput"type="text"/>
                <SearchIcon className="header__searchIcon"/>
            </div>

            <div className="header__nav">
               <Link to={!state.user && './login'}>
               <div className="header__group" onClick={handleSingOut}>
                    <span className="header_lineUP">hello {state.user?state.user.email:"Dear"}</span>
                    <span className="header_lineDown">{state.user ? 'Sign Out' : 'Sign In'}</span>    
               </div>
               </Link>

               <Link to='/orders'>
               <div className="header__group">
                    <span className="header_lineUP">Return</span>
                    <span className="header_lineDown">& Orders</span>
                </div>
               </Link>

                <div className="header__group">
                    <span className="header_lineUP">Yours</span>
                    <span className="header_lineDown">Prime</span>
                </div>
            </div>

            <Link to='/checkout'>
                <div className="header__shope">
                <ShoppingBasketIcon className="header__shopeBasket"/>
                <span className="header__shopeBasketCount">{state.basket?.length}</span>
                </div>
            </Link>
        </div>
    )
}
