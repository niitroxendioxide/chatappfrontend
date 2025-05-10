export interface ClientMessagePayload {
    user: string;
    action: 'msgsend' | 'msgdelete'; // Especifica acciones permitidas
    data: {
        key: string;
    };
}

export interface ServerMessagePayload {
    action: 'message' | 'information';
    payload: {
        key: string,
    };
}
