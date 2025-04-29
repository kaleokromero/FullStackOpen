import './index.css'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  )
}
const ErrorAlert = ({ text }) => {
    if (!text) {
      return null
    }
    return (
    <div className='error'>
      <p>{text}</p>
    </div>
  )
}

export function Notification(message, text) {
    return (
        
    )
}