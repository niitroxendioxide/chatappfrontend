// hooks/useWebSocket.ts
import { listen } from '../utils/connections';
import { useEffect } from 'react';

export const useSocketListener = (callback: (message: unknown) => void) => {
    useEffect(() => {
        const cleanup = listen((event) => {
            try {
                const data = JSON.parse(event.data);
                callback(data);
            } catch (error) {
                console.error('Invalid message format:', error);
            }
        });

        return cleanup;
    }, [callback]);
};