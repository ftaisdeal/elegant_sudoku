import React from 'react';

function Square(props) {
  let classEntry = "";
  if (props.readOnly === true) {
    classEntry = "square readOnly";
  } else {
    classEntry = "square";
  }

  return (
    <input className={classEntry} name={props.id} value={props.value} readOnly={props.readOnly} />
  )
}

export default Square
