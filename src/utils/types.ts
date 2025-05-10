export interface ClientMessagePayload {
    action: 'msgsend' | 'msgdelete'; // Especifica acciones permitidas
    data: {
        key?: string;
        message_content: string;
    };
}

export interface ServerMessagePayload {
    action: 'message' | 'information' | 'login';
    timestamp?: number,
    payload: {
        key?: number,
        status?: "success" | "fail",
        user?: string,
        content?: string,
    };
}

export interface MessageTextBoxProps {
    initialText?: string;
    user?: string;
}