import classes from './Checkout.module.css';
import React, { useRef, useState } from 'react'

const isEmpty=(value)=>value.trim() === ''
const isNotFiveChars=(value)=>value.trim().length < 5

const Checkout = (props) => {

  const [formInputValidity,setFormInputValidity]=useState({
    name:true,
    street:true,
    postalCode:true,
    city:true
  })


  const nameInputRef=useRef()
  const streetInputRef=useRef()
  const postalCodeInputRef=useRef()
  const cityInputRef=useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalCode=postalCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const enteredNameisValid=!isEmpty(enteredName);
    const enteredStreetisValid=!isEmpty(enteredStreet);
    const enteredCityisValid=!isEmpty(enteredCity);
    const enteredPostalCodeisValid=!isNotFiveChars(enteredPostalCode);

    setFormInputValidity({
      name:enteredNameisValid,
      street:enteredStreetisValid,
      postalCode:enteredPostalCodeisValid,
      city:enteredCityisValid
    })

    const formIsValid=enteredNameisValid && enteredStreetisValid && enteredCityisValid && enteredPostalCodeisValid
    if(!formIsValid){
      return;
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postalCode:enteredPostalCode,
      city:enteredCity
    })

  };
  const nameControlClasses=`${classes.control} ${formInputValidity.name?'':classes.invalid}`;
  const streetControlClasses=`${classes.control} ${formInputValidity.street?'':classes.invalid}`;
  const postalCodeControlClasses=`${classes.control} ${formInputValidity.postalCode?'':classes.invalid}`;
  const cityControlClasses=`${classes.control} ${formInputValidity.city?'':classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Please enter a valid Postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;