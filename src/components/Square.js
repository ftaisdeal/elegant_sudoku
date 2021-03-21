import React from 'react'

function handleChange() {

}

const Square = (props) => {

  let value = props.value;

  if (props.value === null) {
    value = ""
  }

  let classEntry = (props.readOnly) ? "square readOnly" : "square"

  return (
    <input className={classEntry} name={props.id} value={value} readOnly={props.readOnly} onChange={handleChange} />
  )
}

export default Square
