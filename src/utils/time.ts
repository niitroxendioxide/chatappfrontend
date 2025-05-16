export const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);

    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};