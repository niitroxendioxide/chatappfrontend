import { useState } from 'react';
import { useSocketListener } from '../../hooks/webSocketListener'
import type { ServerMessagePayload } from '../../utils/types';
import { getUserId } from '../../utils/connections';
import cn from 'classnames';
import textchat from './textchat.module.css'

// Uso en componentes:
const ChatPrincipal = () => {
    let [messages, setMessages] = useState<ServerMessagePayload[]>([]);
    useSocketListener((event) => {
        if (event.action == 'message') {
            setMessages((prevMessages) => [...prevMessages, event.payload]);

            // Optionally log the new messages array
            // console.log([...messages, event.payload]);
        }

        console.log('Mensaje recibido:', event);
    });

    const currentUser = getUserId();

    return (
    <div className={`${textchat.message_container}`}>
      {messages.length === 0 ? (
        <p className={`${textchat.chat_message}`}>No hay mensajes</p>
      ) : (
        messages.map((message) => (
            <div
                key={message.key}
                className={cn(
                    textchat.message_item,
                    message.user === currentUser ? textchat.own_message : textchat.other_message,
                    !message.user && textchat.chat_message
                )}
                data-user-id={message.user}
            >
                <span className={`${textchat.message_user}`}>
                    <div className={`${textchat.username}`}>{message.user === currentUser ? 'You' : 'Usuario ' + message.user}</div> 
                    <div>{message.content}</div>
                </span>
            </div>
            ))
      )}
    </div>
  );
};

export default ChatPrincipal;