import React from 'react'

function Number(props) {
  let className = "number-button"
  if (props.isSelected) className += " selected"
  
  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Number