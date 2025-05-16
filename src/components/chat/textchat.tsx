import { useEffect, useRef, useState } from 'react';
import { useSocketListener } from '../../hooks/webSocketListener'
import type { UserMessage } from '../../utils/types';
import { getUserId } from '../../utils/connections';
import cn from 'classnames';
import textchat from './textchat.module.css'
import { formatTime } from '../../utils/time';

// Uso en componentes:
const ChatPrincipal = () => {
    let [messages, setMessages] = useState<UserMessage[]>([]);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useSocketListener((event) => {
        const payload = event.payload
        const timestamp = event.timestamp

        if ((event.action == 'message' || event.action == 'history') && payload.user) {
            const newmessage: UserMessage = {
              content: payload.content,
              timestamp: timestamp,
              user: payload.user,
              key: payload.key,
            }

            console.log(event);

            setMessages((prevMessages) => [...prevMessages, newmessage]);

            // Optionally log the new messages array
            // console.log([...messages, event.payload]);
        }
    });

    useEffect(() => {
        if (messageContainerRef.current) {
            const container = messageContainerRef.current;
            // Only auto-scroll if user was near bottom
            const shouldScroll = container.scrollTop + container.clientHeight >= container.scrollHeight - 50;

            if (shouldScroll) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [messages]);

    const currentUser = getUserId();

    return (
    <div className={`${textchat.mainchat}`}>
      <div ref={messageContainerRef} className={`${textchat.message_container}`}>
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
                  <div>
                    <span className={`${textchat.message_user}`}>
                        <div className={`${textchat.timestamp}`}>{formatTime(message.timestamp)}</div>
                        <div className={`${textchat.username}`}>{message.user === currentUser ? 'You' : 'Usuario ' + message.user}</div> 
                        <div>{message.content.replace(/^"(.*)"$/, '$1')}</div>
                    </span>
                  </div>
              </div>
              ))
        )}
      </div>
    </div>
  );
};

export default ChatPrincipal;