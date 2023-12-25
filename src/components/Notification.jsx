const Notification = ({ message,messageStatus }) => {
  if (message === null) {
    return null
  }
  const notify = {
    color: messageStatus?'green':'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style = {notify}>
      {message}
    </div>
  )
}
export default Notification