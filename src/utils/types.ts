export interface ClientMessagePayload {
    action: 'msgsend' | 'msgdelete'; // Especifica acciones permitidas
    data: {
        key?: string;
        message_content: string;
    };
}

export interface ServerMessagePayload {
    key?: number,
    status?: "success" | "fail",
    user?: string,
    content?: string,
}

export interface ServerMessage {
    action: 'message' | 'information' | 'login';
    timestamp?: number,
    payload: ServerMessagePayload;
}

export interface MessageTextBoxProps {
    initialText?: string;
    user?: string;
}