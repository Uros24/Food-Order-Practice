import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setformInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef('');
    const streetInputRef = useRef('');
    const postalInputRef = useRef('');
    const cityInputRef = useRef('');
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);
        console.log(enteredPostalIsValid)
        setformInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalIsValid,
            city: enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid

        if (formIsValid) {

            props.onConfirm({
                name: enteredName,
                street: enteredStreet,
                postalCode: enteredPostal,
                city: enteredCity
            }
            )
        }

    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your name</label>
                <input type='text' ref={nameInputRef} id='name' />
                {!formInputsValidity.name && <p>Please enter a valid name !</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' ref={streetInputRef} id='street' />
                {!formInputsValidity.street && <p>Please enter a valid name !</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal code</label>
                <input type='text' ref={postalInputRef} id='postal' />
                {!formInputsValidity.postalCode && <p>Please enter a valid name !</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' ref={cityInputRef} id='city' />
                {!formInputsValidity.city && <p>Please enter a valid name !</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button type='submit' className={classes.submit}>Confirm</button>
            </div>

        </form >
    )
}

export default Checkout
