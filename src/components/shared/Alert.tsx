interface AlertProps {
  type: string,
  message: string,
  show: boolean
}

const Alert = ({type, message, show} : AlertProps) => {
  const alertType = `alert alert-${type}`;

  return (
    show ?
    <div className={alertType} role="alert">
        {message}
    </div> : null
  )
};

export default Alert;