import { useSocketListener } from '../../hooks/webSocketListener'

// Uso en componentes:
const ChatPrincipal = () => {
    useSocketListener((message) => {
        console.log('Mensaje recibido:', message);
    });

    return <div>...</div>;
};

export default ChatPrincipal;