export interface ClientMessagePayload {
    action: 'msgsend' | 'msgdelete'; // Especifica acciones permitidas
    data: {
        key?: string;
        message_content: string;
    };
}

export type status = "success" | "fail"

export interface ServerMessagePayload {
    key: number,
    status: status,
    content: string,
    user?: string,
}

export interface UserMessage {
    content: string,
    user: string,

    key: number,
    timestamp: string,

}

export interface ServerMessage {
    action: 'message' | 'information' | 'login' | 'history';
    timestamp: string,
    payload: ServerMessagePayload;
}

export interface MessageTextBoxProps {
    initialText?: string;
    user?: string;
}