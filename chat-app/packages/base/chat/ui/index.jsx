import { useRef } from 'react';
import { Message } from '@chat-app/message';
import { Loading } from '@chat-app/loading';
import { useChat } from '@chat-app/usechat';
import './index.css';

export const Chat = () => {
  const { messages, getAnswer, isLoading, error } = useChat();
  const inputRef = useRef();

  const messageComponents = messages.map((message, index) => {
    const role = message.getType() === 'human'
      ? 'user'
      : 'assistant';

    return <Message 
      key={ index }
      role={ role }
      content={ message.content }
    />
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = inputRef.current.value;
    inputRef.current.value = '';
    getAnswer(userInput);

  }

  return (
    <main className="chat">
      <section className="chat__messages">
        { messageComponents }

        { isLoading && <Loading /> }
        { error && <p>{ error }</p> } 
      </section>
      <form className="chat__form" onSubmit={ handleSubmit }>
        <input type="text" className="chat__input" ref={ inputRef } />
        <button className="chat__submit">Skicka!</button>
      </form>
    </main>
  )
}