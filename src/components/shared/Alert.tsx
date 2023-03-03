import React from 'react'

const Alert = (props: {type: string, message: string, show: boolean}) => {
  const alertType = `alert alert-${props.type}`;

  return (
    props.show ?
    <div className={alertType} role="alert">
        {props.message}
    </div> : null
  )
};

export default Alert;