// hooks/useWebSocketUser.ts
import { useEffect, useState } from 'react';
import { listen } from '../utils/connections';

export const useWebSocketUser = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const cleanup = listen((message: any) => {
            if (message.type === 'login_success') {
                setUserId(message.userId);
            }
        });

        return cleanup;
    }, []);

    return userId;
};