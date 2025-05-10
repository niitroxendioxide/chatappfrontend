// connections.ts
type WebSocketMessage = Record<string, any>;
type Listener = (message: MessageEvent) => void;

class WebSocketManager {
    private static instance: WebSocketManager;
    private ws: WebSocket | null = null;
    private listeners: Listener[] = [];

    private constructor() {
        this.initialize();
    }

    public static getInstance(): WebSocketManager {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager();
        }

        return WebSocketManager.instance;
    }

    private initialize() {
        this.ws = new WebSocket('ws://localhost:8080');

        this.ws.onopen = () => {
            console.log('Connected!');
        };

        this.ws.onclose = () => {
            console.log('Disconnected');
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onmessage = (e) => this.handleMessage(e);
    }

    // TODO: Hacer una  cola de datos que se refresque y reenvie
    public send(data: WebSocketMessage) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    public close() {
        this.ws?.close();
    }

    // Listen to the server message & bind a function to it
    public listen(listener: Listener): () => void {
        this.listeners.push(listener);

        // Función de cleanup para remover el listener
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    private handleMessage(e: MessageEvent) {
        console.log('Server response:', e.data);

        // Notificar a todos los listeners
        try {
            const data = JSON.parse(e.data);
            this.listeners.forEach(listener => listener(data));
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }
}

// Singleton instance
const wsManager = WebSocketManager.getInstance();

export const send = (data: WebSocketMessage) => wsManager.send(data);
export const closeConnection = () => wsManager.close();
export const listen = (listener: Listener) => wsManager.listen(listener);