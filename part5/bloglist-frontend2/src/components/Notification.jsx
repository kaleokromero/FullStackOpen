import "../styles/notification.css"

export const Notification = ({ message, error }) => {
  return(
    <div className={error ? "error" : "info"}>
      <h2>{message}</h2>
    </div>
  )
}