import type { ClientMessagePayload, ServerMessage } from "./types";
import { PORT, IP  } from "../static/net";

// connections.ts
type WebSocketMessage = Record<string, unknown>;
type Listener = (message: ServerMessage) => void;

class WebSocketManager {
    private static instance: WebSocketManager;
    private ws: WebSocket | null = null;
    private listeners: Listener[] = [];
    private userId: number | null = null;
    private static userNames: Map<number, string> = new Map<number, string>();

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
        this.ws = new WebSocket(`ws://${IP}:${PORT}`);

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
        console.log("Sending!", data)

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
        // Notificar a todos los listeners
        try {
            const data: ServerMessage = JSON.parse(e.data);
            //console.log(data);

            if (data.action === "login" && data.payload.key && data.payload.status === "success") {
                this.userId = data.payload.key;
            }

            this.listeners.forEach(listener => listener(data));
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }

    public get currentUserId(): number | null {
        return this.userId;
    }

    public setUserName(userId: number, userName: string) {
        WebSocketManager.userNames.set(userId, userName.replace(/^"|"$/g, ''));
    }

    public getUserName(userId: number) {
        const userNameFound = WebSocketManager.userNames.get(userId);

        console.log(userNameFound, "username");
        if (userNameFound == undefined) {
            return ["Anónimo " + userId, false];
        }

        return [userNameFound, true]
    }

    public hasUserName() {
        if (!this.currentUserId) return;

        const userNameFound = WebSocketManager.userNames.get(this.currentUserId);

        return userNameFound != undefined;
    }

}

// Singleton instance
const wsManager = WebSocketManager.getInstance();

export const send = (data: Omit<ClientMessagePayload, 'userId'>) => {
    const payload = {
        ...data,
        user: wsManager.currentUserId?.toString(),
    }

    wsManager.send(payload);
};
export const closeConnection = () => wsManager.close();
export const listen = (listener: Listener) => wsManager.listen(listener);
export const getUserId = () => wsManager.currentUserId?.toString();
export const getUserName = (userId: number) => wsManager.getUserName(userId);
export const setUserName = (userId: number, newName: string) => wsManager.setUserName(userId, newName);
export const hasUserName = () => wsManager.hasUserName();