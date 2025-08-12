// React imports
import React from "react"
import { Link } from 'react-router-dom'

// Interface imports
import type { ButtonRadiusProps } from "./interfaces"

// Style imports
import styles from './ButtonRadius.module.scss'


// ButtonRadius Component
const ButtonRadius: React.FC<ButtonRadiusProps> = ({routeTo = "/", ...props}) => {

  // Return Component
  return (

    // Button Link
    <Link to={routeTo} className={`${styles.btnRadius} ${props.classNameButton ? styles[props.classNameButton] : ''}`}>{props.textChildren}</Link>
    
  )
}

// Export ButtonRadius
export default ButtonRadius