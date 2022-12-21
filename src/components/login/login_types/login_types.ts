interface LoginTypes {
    username: string,
    password: string
}

interface UserTypes {
    uuid: string,
    display: string
}

interface LoginServiceTypes {
    authenticated: boolean,
    sessionId: string,
    user: UserTypes
}

export type { LoginTypes, LoginServiceTypes }