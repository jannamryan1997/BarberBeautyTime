export interface IUser {
    access_token: string;
    refresh_token: string;
    user: IUserDetais;
}

export interface IUserDetais {
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    pk: number;
    role: string;
    username: string;
}