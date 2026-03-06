import React from 'react'

const Square = (props) => {
  const value = (props.value === null) ? "" : props.value
  
  let className = "square-container"
  if (props.readOnly) className += " readonly"
  if (props.isSelected) className += " selected"
  if (props.hasError) className += " error"
  
  const handleClick = () => {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <div 
      className={className} 
      onClick={handleClick}
    >
      {value}
    </div>
  )
}

export default Square
