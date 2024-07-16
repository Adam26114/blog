type StoreInSessionFunction = (key: string, value: string) => void;
type LookInSessionFunction = (key: string) => string | null;
type RemoveFromSessionFunction = (key: string) => void;
type LogOutUserFunction = () => void;

export const storeInSession: StoreInSessionFunction = (key, value) => {
    sessionStorage.setItem(key, value);
};

export const lookInSesssion: LookInSessionFunction = (key) => {
    return sessionStorage.getItem(key);
};

export const removeFromSession: RemoveFromSessionFunction = (key) => {
    sessionStorage.removeItem(key);
};

export const logOutUser: LogOutUserFunction = () => {
    sessionStorage.clear();
};
