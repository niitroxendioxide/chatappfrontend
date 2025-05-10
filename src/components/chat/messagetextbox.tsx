// messagetextbox.tsx
import { useState } from 'react';
import { send } from '../../utils/connections';
import { type ClientMessagePayload } from '../../utils/types';

const MessageTextBox = () => {
    //const userId = useWebSocketUser();
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        if (!message.trim()) return;

        const payload: ClientMessagePayload = {
            action: 'msgsend',
            data: { message_content: message.trim() }
        };

        await send(payload);
        setMessage('');
    };

    return (
        <div className="message-box">
        <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Escribe tu mensaje..."}
        />

        <button onClick={handleSend} disabled={!message.trim()}>
            Enviar
        </button>
        </div>
    );
};

export default MessageTextBox;