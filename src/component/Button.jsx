import React from 'react'
import styles from "../styles/modules/button.module.scss";
import { getClasses } from '../utils/getClasses';

const buttonTypes = {
    primary:"primary",
    secondary:"secondary"
};


const Button = ({children,type,variant,...rest}) => {
    
  return (
    <button type={type === 'submit' ? 'submit' : 'button'} className={getClasses([styles.button,styles[`button--${buttonTypes[variant]}`]])}
    {...rest}
    >
        {children}
    </button>
  )
}

function SelectButton ({children,...rest}){
    return (
        <select className={getClasses([styles.button,styles.button__select])} {...rest}>
            {children}
        </select>
    )
}

export {SelectButton};
export default Button