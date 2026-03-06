import React from 'react'

const Square = (props) => {
  const value = (props.value === null) ? "" : props.value
  
  let className = "square"
  if (props.readOnly) className += " readOnly"
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
      style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.readOnly ? '#f0f0f0' : 
                        props.isSelected ? '#e3f2fd' :
                        props.hasError ? '#ffebee' : 'white',
        border: props.isSelected ? '1px solid #2196f3' :
                props.hasError ? '1px solid #f44336' : '1px solid transparent',
        cursor: props.readOnly ? 'default' : 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        color: props.readOnly ? '#666' : 
               props.hasError ? '#f44336' : '#333'
      }}
    >
      {value}
    </div>
  )
}

export default Square
