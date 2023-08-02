interface IUser {
    id?: string | null,
    name?: string,
    email?: string,
    password?: string,
    password_confirmation?: string,
    created_at?: string,
}

export type { IUser }