import React from 'react'

function handleChange() {

}

const Square = (props) => {
  const value = (props.value === null) ? "" : props.value
  const classEntry = (props.readOnly) ? "square readOnly" : "square"
  return (
    <input className={classEntry} name={props.id} value={value} readOnly={props.readOnly} onChange={handleChange} />
  )
}

export default Square
