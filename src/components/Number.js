import React from 'react';

function Number(props) {
  return (
    <button className="number" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Number;