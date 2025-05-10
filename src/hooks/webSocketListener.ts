// hooks/useWebSocket.ts
import { listen } from '../utils/connections';
import { useEffect } from 'react';
import type { ServerMessagePayload } from '../utils/types';

export const useSocketListener = (callback: (message: ServerMessagePayload) => void) => {
    useEffect(() => {
        const cleanup = listen((event) => {
            try {
                callback(event);
            } catch (error) {
                console.error('Invalid message format:', error);
            }
        });

        return cleanup;
    }, [callback]);
};