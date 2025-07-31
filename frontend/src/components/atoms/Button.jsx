import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({to, children, className='', ...props}) => {

    if(to){
        return <Link to={to} className={`text-desktop-p ${className}`}>{children}</Link>
    }

  return (
    <button 
    className={`text-desktop-p ${className}`}
    {...props}>       
          {children}        
    </button>
  )
}

export default Button