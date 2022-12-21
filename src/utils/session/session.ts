import { UserSession } from "./session_types/session_types";

export default class Session {
    // store user data in local storage
    setUserSession = (args: UserSession) => {
        localStorage.setItem("sessionId", args.sessionId);
        localStorage.setItem("uuid", args.uuid);
        localStorage.setItem("display", args.display);
        localStorage.setItem("base64", args.base64);
    };
    // get user data from local storage
    getUserSession = () => {
        const session: UserSession = {
            sessionId: localStorage.getItem("sessionId") || "",
            uuid: localStorage.getItem("uuid") || "",
            display: localStorage.getItem("display") || "",
            base64: localStorage.getItem("base64") || ""
        };
        return session;
    };
    // clear user data from local storage on session end
    clearUserSession = () => {
        localStorage.clear();
    };
}