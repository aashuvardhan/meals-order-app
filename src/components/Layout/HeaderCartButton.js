import React, { useContext } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

const HeaderCartButton=(props)=>{

    const cartCtx=useContext(CartContext);
    const numberOfCartItems=cartCtx.items.reduce((currNumber,item)=>{
        return currNumber+item.amount
    },0)
    const btnClasses=`${classes.button} ${classes.bump}`
    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton