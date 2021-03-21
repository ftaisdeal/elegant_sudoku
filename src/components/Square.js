import React from 'react'

function handleChange() {

}

const Square = (props) => {

  let value = props.value;

  if (props.value === null) {
    value = ""
  }

  let classEntry = ""

  if (props.readOnly === true) {
    classEntry = "square readOnly"
  } else {
    classEntry = "square"
  }

  return (
    <input className={classEntry} name={props.id} value={value} readOnly={props.readOnly} onChange={handleChange} />
  )
}

export default Square
