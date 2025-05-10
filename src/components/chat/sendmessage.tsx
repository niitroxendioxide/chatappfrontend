import { send } from '../../utils/connections';
import { type ClientMessagePayload } from '../../utils/types';

function Button() {
    const handleClick = () => {
        try {
            const message: ClientMessagePayload = {
                user: "beniv",
                action: "msgsend",
                data: { key: "Hola! Soy nuevo aqui, jeje." }
            };

            send(message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <button onClick={handleClick}>
            Enviar Mensaje
        </button>
    );
}

export default Button;