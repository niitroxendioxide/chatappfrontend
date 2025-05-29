// messagetextbox.tsx
import { useState } from 'react';
import { send } from '../../utils/connections';
import { type ClientMessagePayload } from '../../utils/types';
import messagetextbox from './messagetextbox.module.css'

const MessageTextBox = () => {
    //const userId = useWebSocketUser();
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        if (!message.trim()) return;

        const payload: ClientMessagePayload = {
            action: 'msgsend',
            data: { message_content: message.trim(), replying_to: 0 }
        };

        await send(payload);
        setMessage('');
    };

    const handleOnKey = (event: React.KeyboardEvent) => {
        console.log(event.type)

        if (event.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <div className={`${messagetextbox.textbox}`}>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleOnKey}
                placeholder={"Escribe tu mensaje..."}
                size={50}
                height={150}
            />

            <button onClick={handleSend} disabled={!message.trim()}>
                Enviar
            </button>
        </div>
    );
};

export default MessageTextBox;