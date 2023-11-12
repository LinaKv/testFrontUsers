export function isValidUserName(email: string) {
    return /^[a-zA-Z0-9@.+\-_/]+$/.test(email);
}

export function isValidUserNameForChange(email: string) {
    if (!email) return true;
    return /^[a-zA-Z0-9@.+\-_/]+$/.test(email || '');
}

export function isValidPassword(password: string) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}
