export interface ClientMessagePayload {
    action: 'msgsend' | 'msgdelete'; // Especifica acciones permitidas
    data: {
        key?: string;
        message_content: string;
        replying_to?: number;
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
    action: 'message' | 'information' | 'login' | 'history' | "user_remove" | "user_add";
    timestamp: string,
    payload: ServerMessagePayload;
}

export interface MessageTextBoxProps {
    initialText?: string;
    user?: string;
}