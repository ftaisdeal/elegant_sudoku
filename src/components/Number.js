import React, { useState } from 'react'

function Number(props) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <button
      className="number"
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '10px 14px',
        fontSize: '16px',
        backgroundColor: props.isSelected ? '#2196f3' : 
                        isHovered ? '#d0d0d0' : '#e0e0e0',
        color: props.isSelected ? 'white' : '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        minWidth: '40px',
        fontWeight: '200'
      }}
    >
      {props.value}
    </button>
  );
}

export default Number