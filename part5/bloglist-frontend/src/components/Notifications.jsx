import '../index.css'

const NotificationAlert = ({ message }) => {
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

export default function Notification({message, text}) {
    return (
      <div>
        <ErrorAlert text={message}/>
        <NotificationAlert message={text}/>
      </div>
    )
}