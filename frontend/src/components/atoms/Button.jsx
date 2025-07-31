import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({to, children, className='', ...props}) => {

    if(to){
        return <Link to={to} className={`${className}`}>{children}</Link>
    }

  return (
    <button 
    className={`${className}`}
    {...props}>       
          {children}        
    </button>
  )
}

export default Button