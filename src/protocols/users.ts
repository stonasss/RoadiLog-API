export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    token: string,
}

export type RegisterUser = Omit<User, "token" | "id">