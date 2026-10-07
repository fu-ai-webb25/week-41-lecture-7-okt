import './index.css';

export const Message = ({ role, content }) => {
  console.log(role);
  const isOwnMessage = role === 'user'; 

  return (
    <article className={
      `message ${isOwnMessage ? 'message--user' : 'message--bot'}`
    }>
      <section className="message__bubble">
        <span className="message__sender">{ role }</span>
        <p className="message__text">{ content }</p>
      </section>
    </article>
  )
}