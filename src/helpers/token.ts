const TOKEN_TTL_MS = 86340000;

const isExpired = (timeStamp?: number): boolean => {
    if (!timeStamp) return false;

    const now = new Date().getTime();
    const diff = now - timeStamp;

    return diff > TOKEN_TTL_MS;
};

export { isExpired };
